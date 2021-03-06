import styled from "styled-components";
import React from "react";

const Image = (props) => {
  const {
    shape,
    src,
    size,
    height,
    width,
    margin,
    _onClick,
    radius,
    className,
  } = props;

  const styles = {
    src: src,
    size: size,
    width: width,
    height: height,
    margin: margin,
    _onClick: _onClick,
    radius: radius,
    className: className,
  };

  if (shape === "myIcon") {
    return <MyProfile {...styles} onClick={_onClick} />;
  }

  if (shape === "rectangle") {
    return (
      <AspectOutter>
        <AspectInner {...styles} />
      </AspectOutter>
    );
  }

  if (shape === "imgBtn") {
    return (
      <AspectOutter>
        <ImgBtn {...styles} onClick={_onClick} />
      </AspectOutter>
    );
  }
  return (
    <React.Fragment>
      <MyProfile {...styles} onClick={_onClick} />
    </React.Fragment>
  );
};

Image.defaultProps = {
  shape: "myIcon",
  src: "https://fdn.gsmarena.com/imgroot/news/18/03/instagram-timeline-changes/-728/gsmarena_001.jpg",
  size: 36,
  _onClick: () => {},
};

const AspectOutter = styled.div`
  width: ${(props) => props.width};
  min-width: 250px;
`;

const AspectInner = styled.div`
  position: relative;
  overflow: hidden;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  ${(props) => (props.src ? `background-image: url(${props.src});` : "")}
  background-size: cover;
`;

const MyProfile = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  ${(props) => (props.src ? `background-image: url(${props.src});` : "")}
  &:hover {
    opacity: 0.9;
    cursor: pointer;
  }
`;

const ImgBtn = styled.div`
  position: relative;
  overflow: hidden;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  ${(props) => (props.src ? `background-image: url(${props.src});` : "")}
  background-size: cover;
  &:hover {
    opacity: 0.9;
  }
`;
export default Image;
