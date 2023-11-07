import { useContext } from 'react'
import { MiContexto } from '../../Context'
import { Carousel } from "react-bootstrap"
import OrderCard from "../OrderCard"

const CarouselListCards = ({ data }) => {
  const context = useContext(MiContexto)

  const handleSelect = (selectedIndex) => {
    context.setIndexItems(selectedIndex);
  };

  return (
    <>
      <Carousel interval={null} activeIndex={context.indexItems} onSelect={handleSelect}>
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