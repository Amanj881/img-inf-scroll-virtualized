import React,{useState,useEffect,useRef} from 'react';
import './App.css';
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component';
import Modal from './Modal'
import {
        List,
        AutoSizer,
        CellMeasurer,
        CellMeasurerCache

} from 'react-virtualized'

function App() {
  const accessKey="qByJa4fy2LPbt5iyX2nABR5l2EaA9tXOZ3MeJCxEWwY";
  const apiRoot="https://api.unsplash.com/" ;
  const [scrollImage, setScrollImage] = useState()   
  const [image, setImage] = useState([])
  const [modal, setModal] = useState(true);
  const [index, setIndex] = useState(0)
  const [imgPath, setImgPath] = useState()

   useEffect(() => {
     getImage();
     
   }, [])


   const getImage = (count=100) => {
    axios.get(`${apiRoot}/photos/random/?client_id=${accessKey}&count=${count}`).
     then((res)=>{
       // setModalImage(res.data)
        // setModalImage(res.data)
       console.log(res.data); 
      setImage([...image,...res.data])
     })
   }

   const closeModal =() => {
    setModal(true);
   }

   const openModal = (path,index) => {
    // console.log("d",path[index].urls.small);
    setImgPath(path[index]);
    setModal(false);
    setIndex(index);
   }
    const cache = useRef(new CellMeasurerCache({
      fixedWidth:true,
      defaultHeight:100
    }))
  return (
    <div className="App">
    {modal && (<div style={{width:"100%",height:"100vh"}}>
      <AutoSizer >
      {({width,height})=>
      (<List width={width}
             height={height}
             rowHeight={150}
             rowCount={image.length}
             rowRenderer={({key,index,style,parent})=>{
              const img = image[index];
                return (<div key={key} >
                <img src={img.urls.small} onClick={()=>openModal(image,index)}/>
                </div>
                                    )
                    }}
                 />)}</AutoSizer></div> )      
} <Modal closeModal={closeModal} show={modal} src={imgPath} index={index} image={image} setIndex={setIndex} getData={getImage}/>


    </div>
  );
}

export default App;
