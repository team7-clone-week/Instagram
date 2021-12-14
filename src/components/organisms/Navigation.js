import React, { useState } from "react";
import styled from "styled-components";

// react-icons
import { NavLink, withRouter, useHistory } from "react-router-dom";
import { GrHomeRounded } from "react-icons/gr";
import { IoMdPaperPlane } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { FiPlusSquare } from "react-icons/fi";
import {
  AiOutlineHome,
  AiOutlineCompass,
  AiOutlineHeart,
  AiFillHome,
} from "react-icons/ai";
import { AiOutlinePicture, AiOutlineClose } from "react-icons/ai";
import { BsPlayBtn } from "react-icons/bs";
import Posting from "./Posting";

// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import SwiperCore, { Navigation } from "swiper";

function Navi({ location }) {
  const history = useHistory();

  SwiperCore.use([Navigation]);

  const [PostModal, setPostModal] = useState(false);
  const [upload, setUpload] = useState([]);

  const addUpload = (e) => {
    e.preventDefault();

    const selectedImgList = e.target.files;
    console.log(selectedImgList);
    const ImgUrlList = [...upload];

    for (let i = 0; i < selectedImgList.length; i++) {
      const ImgUrl = URL.createObjectURL(selectedImgList[i]);

      ImgUrlList.push(ImgUrl);
    }
    setUpload(ImgUrlList);
  };

  const closeUpload = (e) => {
    e.preventDefault();

    setUpload([]);
    setPostModal(false);
  };

  console.log(upload);

  return (
    <Wrap>
      <NavWrap>
        <ImgArea onClick={() => history.push("/")}>
          <img
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
            alt="insta_logo"
          />
        </ImgArea>
        <InputArea>
          <IoSearch
            style={{ position: "absolute", right: "5px", top: "2px" }}
            size="30"
            color="#999"
          />
          <Input style={{ border: "1px solid #999" }} />
        </InputArea>
        <NavPages>
          <NavLink to="/">
            {location.pathname === "/" ? (
              <AiFillHome size="28" style={{ margin: "0 10px" }} />
            ) : (
              <AiOutlineHome size="28" style={{ margin: "0 10px" }} />
            )}
          </NavLink>
          <IoMdPaperPlane size="28" style={{ margin: "0 10px" }} />
          <FiPlusSquare
            size="28"
            style={{ margin: "0 10px" }}
            onClick={() => setPostModal(true)}
          />
          <AiOutlineCompass size="28" style={{ margin: "0 10px" }} />
          <AiOutlineHeart size="28" style={{ margin: "0 10px" }} />
          <img
            src=""
            alt="profile"
            style={{ margin: "0 10px", width: "30px", borderRadius: "100%" }}
          />{" "}
        </NavPages>
      </NavWrap>
      <Posting visible={PostModal} width="500px" outline="none">
        <PostingTitleArea>
          <PostingTitle>새 게시물 만들기</PostingTitle>
        </PostingTitleArea>

        {(upload.length !== 0 &&
          upload.map((file, key) => {
            return (
              <>
                <div
                  key={key}
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <img
                    src={file}
                    alt="userUploadImg"
                    style={{ width: "400px" }}
                  />
                </div>
              </>
            );
          })) || (
          <PostingImgArea>
            <PostingImg>
              <ImgIconArea>
                <AiOutlinePicture size="75" />
                <Skew>
                  <BsPlayBtn size="75" style={{ backgroundColor: "#fff" }} />
                </Skew>
              </ImgIconArea>
              <ImgContent>사진과 동영상을 여기에 끌어다 놓으세요.</ImgContent>
              <Label htmlFor="file">컴퓨터에서 선택</Label>
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                multiple
                accept="image/*, video/*"
                onChange={addUpload}
              />
            </PostingImg>
          </PostingImgArea>
        )}

        <ClosePosting onClick={closeUpload}>
          <AiOutlineClose size="35" color="#fff" />
        </ClosePosting>
      </Posting>
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 1440px;
  height: 60px;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  background-color: #fff;
  position: fixed;
  z-index: 3;
  border-bottom: 1px solid #ddd;
`;

const NavWrap = styled.div`
  max-width: 975px;
  width: 975px;
  padding: 0 20px;
  display: flex;
  height: 60px;
  background-color: #fff;
  margin: auto;
  align-items: center;
  justify-content: center;
  /* position: fixed; */
  border-bottom: 1px solid #ddd;
`;

const ImgArea = styled.div`
  width: 36%;
  cursor: pointer;
`;

const Img = styled.image``;

const InputArea = styled.div`
  display: flex;
  position: relative;
`;

const Input = styled.input`
  width: 268px;
  height: 36px;
  padding: 12px;
  /* border: 1px solid #eee; */
  border-radius: 2px;
  background-color: rgba(var(--b3f, 250, 250, 250), 1);
  outline: none;
`;

const NavPages = styled.div`
  width: 36%;
  display: flex;
  justify-content: flex-end;
`;

const PostingTitleArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  border-bottom: 1px solid #ccc;
  padding: 18px;
`;

const PostingImgArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 465px;
`;

const ImgIconArea = styled.div`
  position: absolute;
  top: 175px;
  left: 190px;
`;

const PostingImg = styled.div`
  text-align: center;
`;

const Skew = styled.div`
  transform: rotate(20deg);
  position: absolute;
  top: -20px;
  left: 40px;
  /* background-color: #fff; */
  box-sizing: border-box;
  outline: none;
`;
const PostingTitle = styled.div`
  font-weight: bold;
  font-size: 16px;
`;

const ImgContent = styled.div`
  font-size: 22px;
  color: #262626;
  padding-bottom: 30px;
`;

const Label = styled.label`
  width: 88px;
  height: 18px;
  background-color: #0095f6;
  color: #fff;
  padding: 5px 10px;
  border-radius: 3px;
  font-weight: bold;
  cursor: pointer;
`;

const ClosePosting = styled.div`
  position: fixed;
  top: -60px;
  right: -60px;
  cursor: pointer;
`;

export default withRouter(Navi);
