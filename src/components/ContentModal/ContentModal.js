import React,{useEffect, useState} from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';

import './ContentModal.css'
import Carousel from '../../components/Carousel/Carousel.js'
import axios from 'axios';


import {
    img_500,
    unavailable,
    unavailableLandscape,
  } from "../../config/config";
const style = {
    width: "70%",
    height: "60%",
    backgroundColor: "#39445a",
    border: "1px solid #282c34",
    borderRadius: 10,
    color: "white",
    boxShadow: 5,
    padding: 10
};

const style1={
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}

export default function ContentModal({children,media_type,id}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [content,setContent]=useState([])
  const [video,setVideo]=useState()

  const fetchData=async()=>{
    const {data}=await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`) 
    setContent(data)
}

  const fetchVideo=async()=>{
    const {data}=await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`) 
    setVideo(data.results[0]?.key)
  }

  useEffect(()=>{
    fetchData();
    fetchVideo();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  return (
    <>
      <div className='media' onClick={handleOpen}>
        {children}
      </div>
      <Modal
        style={style1}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
         <Fade in={open}>
          {content && (
            <Box sx={style}>
              <div className="ContentModal">
                <img
                  src={
                    content.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : unavailable
                  }
                  alt={content.name || content.title}
                  className="ContentModal__portrait"
                />
                <img
                  src={
                    content.backdrop_path
                      ? `${img_500}/${content.backdrop_path}`
                      : unavailableLandscape
                  }
                  alt={content.name || content.title}
                  className="ContentModal__landscape"
                />
                <div className="ContentModal__about">
                  <span className="ContentModal__title">
                    {content.name || content.title} (
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "-----"
                    ).substring(0, 4)}
                    )
                  </span>
                  {content.tagline && (
                    <i className="tagline">{content.tagline}</i>
                  )}

                  <span className="ContentModal__description">
                    {content.overview}
                  </span>

                  <div>
                    <Carousel id={id} media_type={media_type} />
                  </div>

                  <Button
                    variant="contained"
                    
                    color="secondary"
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    Watch the Trailer
                  </Button>
                </div>
              </div>
            </Box>
          )}
        </Fade>
      </Modal>
    </>
  );
}
