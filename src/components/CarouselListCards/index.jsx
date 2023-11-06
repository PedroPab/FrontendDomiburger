import { useContext } from 'react'
import { MiContexto } from '../../Context'
import { Carousel } from "react-bootstrap"
import OrderCard from "../OrderCard"

const CarouselListCards = ({ data }) => {
  const context = useContext(MiContexto)

  const handleSelect = (selectedIndex) => {
    console.log("🚀 ~ file: index.jsx:10 ~ handleSelect ~ selectedIndex:", selectedIndex)

    context.setIndexItems(selectedIndex);
  };


  const index = context.indexItems
  console.log("index del carruserl index:", index)



  return (
    <>
      <Carousel interval={null} activeIndex={index} onSelect={handleSelect}>
        {
          data ?
            data.map((pedido, i) => (
              <Carousel.Item
                key={i}

              >
                <div
                  className="d-flex justify-content-around"
                >
                  <OrderCard
                    dataPedido={pedido.data}
                  />
                </div>

              </Carousel.Item>
            )) :
            <></>
        }
      </Carousel>


    </>

  )
}

export default CarouselListCards