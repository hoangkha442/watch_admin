import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import TitleCard from '../../../components/Cards/TitleCard';
import { useEffect, useState } from 'react';
import { productService } from '../../../services/ProductService';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BarChart(){

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          }
        },
      };
      
      const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
      const [getPrice, setGetPrice] = useState()
      console.log('getPrice: ', getPrice);
      useEffect(() => { 
        productService.getOrder().then((res) => { 
          setGetPrice(res.data)
         })
      },[])
      const data = {
        labels,
        datasets: [
          {
            label: 'Online',
            data: getPrice?.map((item) => { return item.total_amount }),
            backgroundColor: 'rgba(255, 99, 132, 1)',
          }
        ],
      };

    return(
      <TitleCard title={"Revenue"}>
            <Bar options={options} data={data} />
      </TitleCard>

    )
}


export default BarChart