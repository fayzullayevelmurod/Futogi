import assets from "../assets";
export const TitleBox = ({ name }) => {
  return (
    <div className="title_box">
      <img
        className="top_gradient"
        src={assets.topGradient}
        alt=""
        height={180}
        width="100%"
      />
      <div className="container">
        <h1 className="title">{name}</h1>
      </div>
    </div>
  );
};
