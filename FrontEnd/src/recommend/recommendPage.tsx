import React, { useState } from "react";
import styled from "styled-components";
import Button from "../components/button";
import Dialog from "../components/dialog";
import MainBox from "../components/mainBox";
import ImgUpload from "../imgUpload/imgUpload";

function Recommend() {
  //   const [isOpen, setIsOpen] = useState(false);

  return (
    <MainBox>
      <Dialog btnContext="옷장에서 옷 꺼내기" title="내 옷장"></Dialog>
    </MainBox>
  );
}

export default Recommend;
