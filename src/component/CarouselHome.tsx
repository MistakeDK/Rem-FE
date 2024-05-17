import { Carousel } from 'antd';
import React from 'react'
import slide_1 from '~/resources/slide_1.png'
import slide_2 from '~/resources/slide_2.png'
function CarouselHome() {
  const contentStyle: React.CSSProperties = {
    width: '100%',
    height: '80%',
  };
  const onChange = (currentSlide: number) => {

  }
  return (
    <div>
      <Carousel autoplay={true} afterChange={onChange}>
        <div>
          <img style={contentStyle} src={slide_1} />
        </div>
        <div>
          <img style={contentStyle} src={slide_2} />
        </div>
      </Carousel>
    </div>
  )
}

export default CarouselHome