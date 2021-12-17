import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { BsThreeDots } from "react-icons/bs";
import { AiOutlineHeart, AiFillHeart, AiOutlineClose } from "react-icons/ai";
import { IoMdPaperPlane } from "react-icons/io";
import { IoChatbubbleOutline } from "react-icons/io5";
import { RiBookmarkLine } from "react-icons/ri";
import { CgSmile } from "react-icons/cg";

import CommentDetail from "./CommentDetail";
import { addCommentDB } from "../../redux/comment";
import { addLikeDB } from "../../redux/like";

//swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import SwiperCore, { Navigation, Pagination } from "swiper";

export default function PostView(props) {
  const post = props;

  const createAt = post.createdAt.split("T")[1].split(":")[0];
  const postId = post.postId;
  const imgUrl = post.imgUrl.split(",");
  const dispatch = useDispatch();
  const [hasComment, setHasComment] = useState("");
  const [like, setLike] = useState(false);

  const [contentMore, setContentMore] = useState(false);
  const [commentShow, setCommentShow] = useState(false);
  const [commentModal, setCommentModal] = useState(false);

  //   const data = useSelector((state) => state.post.list);
  //   console.log(data);

  const changeComment = (e) => {
    setHasComment(e.target.value);
    console.log(hasComment);
  };

  const addComment = (postId) => {
    console.log(postId, hasComment);
    dispatch(addCommentDB(postId, hasComment));
  };

  const addLike = (postId) => {
    console.log(postId);
    // setLike(true);
    alert("좋아요");
    // dispatch(addLikeDB(postId));
  };

  const delLike = () => {
    setLike(false);
    alert("취소");
  };

  SwiperCore.use([Navigation, Pagination]);

  const swiperParams = {
    navigation: true,
    pagination: true,
  };
  return (
    <Wrap>
      <PostHeader>
        <HeaderLeft>
          <Link to="/">
            <PostTitleImgArea>
              <PostTitleImg
                src="https://icon-library.com/images/50x50-icon/50x50-icon-18.jpg"
                alt="누군가의이미지"
              />
            </PostTitleImgArea>
          </Link>
          <Link to="/">
            <PostTitle>{post.username}</PostTitle>
          </Link>
        </HeaderLeft>
        <PostMenu>
          <MenuArea>
            <BsThreeDots size="20" />
          </MenuArea>
        </PostMenu>
      </PostHeader>
      {imgUrl.length > 1 ? (
        <Swiper {...swiperParams}>
          {imgUrl.map((img, key) => {
            return (
              <SwiperSlide key={key}>
                <PostCenter>
                  <PostMainImg src={img} alt="img" />
                </PostCenter>
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        <>
          {imgUrl.map((img, key) => {
            return (
              <PostCenter key={key}>
                <PostMainImg src={img} alt="img" />
              </PostCenter>
            );
          })}
        </>
      )}

      <PostFooter>
        <FooterMenu>
          {(post.numofLikes && (
            <AiFillHeart
              size="28"
              style={{ margin: "8px" }}
              onClick={() => delLike(postId)}
              color="red"
            />
          )) || (
            <AiOutlineHeart
              size="28"
              style={{ margin: "8px" }}
              onClick={() => addLike(postId)}
            />
          )}

          <Link to="/">
            <IoChatbubbleOutline size="28" style={{ margin: "8px" }} />
          </Link>
          <Link to="/direct">
            <IoMdPaperPlane size="28" style={{ margin: "8px" }} />
          </Link>
          <Link to="/">
            <RiBookmarkLine
              size="28"
              style={{
                position: "absolute",
                top: "10px",
                right: "8px",
              }}
            />
          </Link>
        </FooterMenu>
        <LikeArea>
          <Like>좋아요 {post.numOfLikes}개</Like>
        </LikeArea>
        <PostContent>
          <Link to="/">
            <Username>{post.username}</Username>
          </Link>
          <ContentTitle>{post.content}</ContentTitle>
          {contentMore && (
            <ContentMore onClick={() => setContentMore(false)}>
              <span
                style={{
                  color: "#999",
                  fontWeight: "600",
                  cursor: "pointer",
                  paddingLeft: "10px",
                }}
              >
                내용 접기
              </span>
            </ContentMore>
          )}
          {contentMore || (
            <ContentMore onClick={() => setContentMore(true)}>
              <span>... </span>
              <span
                style={{
                  color: "#999",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                더 보기
              </span>
            </ContentMore>
          )}
        </PostContent>
        {contentMore && (
          <>
            <Content>{post.content}</Content>
          </>
        )}
        {post.numOfComments > 0 && (
          <CommentsShow
            onClick={() => {
              setCommentShow(true);
              setCommentModal(true);
            }}
          >
            댓글 {post.numOfComments}개 모두 보기
          </CommentsShow>
        )}
        {commentModal && (
          <>
            <CommentDetail visible={commentModal} postId={postId} />
            <ClosePosting
              onClick={() => {
                setCommentModal(false);
                setCommentShow(false);
              }}
            >
              <AiOutlineClose size="30" color="#fff" />
            </ClosePosting>
          </>
        )}

        {commentShow && (
          <>
            <CommentsShow onClick={() => setCommentShow(false)}>
              댓글 접기
            </CommentsShow>
            <div style={{ display: "flex" }}>
              <Username style={{ padding: "0 6px 0 16px" }}>username</Username>
              <Comments>댓글입니다!!</Comments>
            </div>
          </>
        )}
        <Link to="/">
          <ModifiedAt>{createAt}시간 전</ModifiedAt>
        </Link>
        <WriteComment>
          <CgSmile size="28" style={{ margin: "0 16px", cursor: "pointer" }} />
          <Message placeholder="댓글 달기..." onChange={changeComment} />
          {hasComment !== "" ? (
            <Commenting onClick={() => addComment(postId)}>게시</Commenting>
          ) : (
            <Commenting style={{ opacity: "0.3", pointerEvents: "none" }}>
              게시
            </Commenting>
          )}
        </WriteComment>
      </PostFooter>
    </Wrap>
  );
}

const Wrap = styled.div`
  border: 1px solid #ddd;
  width: 616px;
  background-color: #fff;
  margin-bottom: 25px;

  @media screen and (max-width: 920px) {
    margin: auto;
    margin-bottom: 24px;
    width: 95%;
    overflow: scroll;
  }
`;

const PostHeader = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
`;

const HeaderLeft = styled.div`
  width: 566px;
  display: flex;
  align-items: center;
`;

const PostTitleImgArea = styled.div`
  width: 39px;
  height: 39px;
  border: 2px solid transparent;
  border-radius: 100%;
  background-image: linear-gradient(#fff, #fff),
    linear-gradient(to right, #f7d358, #f781be, #df01d7);
  background-origin: border-box;
  background-clip: content-box, border-box;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  margin: 16px;
  cursor: pointer;
`;

const PostTitleImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 100%;
`;

const PostTitle = styled.div`
  font-weight: bold;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const PostMenu = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: auto;
  padding-right: 8px;
  cursor: pointer;
`;

const MenuArea = styled.div`
  padding: 8px;
`;

const PostCenter = styled.div``;

const PostMainImg = styled.img`
  width: 614px;

  @media screen and (max-width: 920px) {
    width: 100%;
  }
`;

const PostFooter = styled.div``;

const FooterMenu = styled.div`
  padding: 8px;
  position: relative;
`;

const LikeArea = styled.div`
  font-weight: bold;
  padding: 0 16px 10px;
`;

const Like = styled.span`
  cursor: pointer;
`;

const PostContent = styled.div`
  padding: 0 16px;
  display: flex;
`;

const Username = styled.div`
  font-weight: bold;
  padding-right: 6px;

  &:hover {
    text-decoration: underline;
  }
`;

const ContentTitle = styled.span``;

const Content = styled.div`
  padding: 3px 16px 15px;
  line-height: 1.2;
`;

const ContentMore = styled.div``;

const CommentsShow = styled.div`
  color: #999;
  padding: 6px 16px;
  cursor: pointer;
`;

const Comments = styled.div`
  /* padding: 6px 16px; */
`;

const ModifiedAt = styled.div`
  font-size: 10px;
  color: #999;
  padding: 10px 16px 20px;
  border-bottom: 1px solid #ddd;
`;

const WriteComment = styled.div`
  height: 53px;
  display: flex;
  align-items: center;
`;

const Message = styled.textarea`
  width: 500px;
  height: 18px;
  max-height: 80px;
  outline: none;
  border: 0;
  font-size: 14px;
  resize: none;
  flex-grow: 1;
  flex-direction: column;
  white-space: pre-wrap;
  word-wrap: break-word;
`;

const Commenting = styled.div`
  width: 40px;
  color: rgba(var(--d69, 0, 149, 246), 1);
  cursor: pointer;
`;

const ClosePosting = styled.div`
  position: fixed;
  top: 30px;
  right: 30px;
  cursor: pointer;
  z-index: 9999;
`;