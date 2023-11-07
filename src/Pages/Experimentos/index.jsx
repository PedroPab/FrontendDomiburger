import Carousel from './../../components/Carousel';

const cards = [
  <div key={1}>Card 1</div>,
  <div key={2}>Card 2</div>,
  <div key={3}>Card 3</div>,
  // ... Agrega más cards según necesites
];

const App = () => {
  return (
    <div>
      <h1>Carousel Example</h1>
      <Carousel cards={cards} />
    </div>
  );
};

export default App;
