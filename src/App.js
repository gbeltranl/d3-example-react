import './App.css';
import HorizontalBar from './charts/horizontal-bar-chart';
import Bar from './charts/bar-chart';
import Pie from './charts/pie-chart';

const data = [
  { item: 'Redmi', count: 490 },
  { item: 'Huawei', count: 291 },
  { item: 'IPhone', count: 348 },
  { item: 'Samsung', count: 245 },
  { item: 'Pixel', count: 50 },
];

function App() {
  return (
    <>
      <h1>D3 demo</h1>
      <Bar data={data} />
      <HorizontalBar data={data}/>
      <Pie data={data} />
    </>
  );
}

export default App;
