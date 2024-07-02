import { FaL, FaLocationPin } from "react-icons/fa6";
/**
 * 
 * data {
    high
    low
    close
 * }
 */

function HighLow({ data }) {
  const { h, l, c, o } = data;
  const iconOffset = 100 - ((h - c) / (h - l)) * 100;
  const iconPosition = iconOffset > 100 ? 100 : iconOffset < 0 ? 0 : iconOffset;
  const oOffset = ((o - l) / (h - l)) * 100;
  const oPosition = oOffset > 100 ? 100 : oOffset < 0 ? 0 : oOffset;
  // console.log(iconPosition);

  let right = 0;
  let width = 0;

  if (iconPosition > oPosition) {
    right = `calc(100% - ${iconPosition + 8}px)`;
    width = `calc(${iconPosition - oPosition}px)`;
    // left = "";
  } else {
    right = `calc(100% - ${oPosition + 8}px)`;
    width = `calc(${oPosition - iconPosition}px)`;
    // right = "";
  }

  return (
    <div>
      <div className="indicatorMain relative w-full h-[4px] bg-slate-400">
        <FaLocationPin
          color="rgb(54, 161, 255)"
          style={{
            position: "absolute",
            top: "-14px",
            left: `${iconPosition}px`,
          }}
        />
        {/* <FaLocationPin
          color="rgb(145, 3, 21)"
          style={{
            position: "absolute",
            top: "-14px",
            left: `${oPosition}px`,
          }}
        /> */}

        <div
          className="trendIndicator"
          style={{
            position: "absolute",
            height: "4px",
            backgroundColor: "rgb(54, 161, 255)",
            right: right,
            width: width,
          }}
        ></div>
      </div>
      <div className="flex justify-between mt-2">
        <span>{Math.round(l * 1000) / 1000}</span>
        <span>{Math.round(h * 1000) / 1000}</span>
      </div>
    </div>
  );
}

export default HighLow;
