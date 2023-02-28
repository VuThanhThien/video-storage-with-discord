import { IPFSObject } from "../../interface/ipfs.interface";
import { VideoJS } from "../Video";
import "./MediaScroll.css";
import Popup from "reactjs-popup";
import { useEffect, useState } from "react";
import { parseDate } from "../../utils/utils";
import { Spinner } from "../Spinner/Spinner";
import { useIpfs } from "../../hooks/useIpfs";

interface Props {
  className?: string;
  title: string;
  before?: string;
  ratio: string;
  refresh?: string;
}

export const MediaScroll = ({
  refresh,
  before,
  className,
  title,
  ratio,
}: Props) => {
  const [selectedItem, setselectedItem] = useState<IPFSObject | null>(null);
  const [isLoading, error, data, fetchData] = useIpfs({
    limit: 10,
    before,
  });

  useEffect(() => {
    if (!isLoading) {
      fetchData();
    }
  }, [refresh]);

  function generateMediaItem(item: IPFSObject, fullsize: boolean = false, className?: string) {
    if (item.name.endsWith(".mp4")) {
      return (
        <picture className={`w-full ${className}`}>
          <VideoJS
            className="h-full"
            options={{
              autoplay: true,
              controls: true,
              aspectRatio: ratio,
              sources: [
                {
                  src: `https://w3s.link/ipfs/${item.cid}/${item.name}?download=1`,
                  type: "video/mp4",
                },
              ],
            }}
          />
        </picture>
      );
    } else {
      let itemName;
      if (!fullsize) {
        let name = item.name.split(".");
        name[name.length - 1] = "JPEG";
        itemName = `compressed_${name.join(".")}`;
      } else {
        itemName = item.name;
      }

      return (
        <picture>
          <img
            alt={item.name}
            className={`${className}`}
            loading="lazy"
            src={`https://w3s.link/ipfs/${item.cid}/${itemName}`}
          />
        </picture>
      );
    }
  }

  return (
    <div className={`p-10 ${className}`}>
      <h3 className="font-bold text-2xl mb-6 text-white">{title}</h3>
      <section>
        {isLoading ? (
          <Spinner />
        ) : (
          <ul className="horizontal-media-scroller overflow-auto grid grid-flow-col gap-5">
            {data.map((item: IPFSObject) => (
              <li key={item._id} className="inline-block">
                <a href="#">
                  <figure onClick={() => setselectedItem(item)}>
                    {generateMediaItem(item)}
                    <figcaption className="text-sm truncate pt-0 mt-0 text-white w-full" title={item.name}>
                      {item.name}
                    </figcaption>
                  </figure>
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>

      <Popup
        modal
        nested
        open={selectedItem !== null}
        contentStyle={{
          backgroundColor: "#383838",
          border: "none",
          borderRadius: 20,
          padding: 20,
        }}
        onClose={() => setselectedItem(null)}
      >
        <section className=" bg-black flex rounded-[10px]">
          {selectedItem && generateMediaItem(selectedItem, true, "rounded-l-[10px]")}
          {selectedItem && (
            <div className="w-2/5 pr-5 pt-3 text-white">
              <h1 className="w-full text-lg truncate">{selectedItem?.name}</h1>
              <h3 className="my-1">
                <span className="font-medium">Type: </span>
                {selectedItem?.type}
              </h3>
              <h3 className="my-1">
                <span className="font-medium">Date: </span>
                {parseDate(selectedItem?.created)}
              </h3>
              <h3 className="my-1">
                <span className="font-mediu=">Size: </span>
                {(selectedItem!.dagSize / 1000000).toFixed(2)} mb
              </h3>
              <h3 className="my-1 break-words italic text-sm">
                <span className="font-medium 	">CID: </span>
                {selectedItem?.cid}
              </h3>
            </div>
          )}
        </section>
      </Popup>
    </div>
  );
};
