import React, { useEffect } from 'react';
import Layout from '../../layout';
import LayoutAdmin from '../../components/admin';
import { useDispatch, useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { getStatisticalFromOrders } from '../../redux/actions/order.action';
import { get } from 'lodash';
// import styles from './styles.module.scss';

export default function HomePage() {
  const statistical = useSelector((state) => state.orderReducer.statistical);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getStatisticalFromOrders())
  },[])
  return (
    <Layout>
      <LayoutAdmin>
        <Bar
          data ={{
            labels: statistical.map(value=>value.name),
            datasets: [{
              label: '# of Votes',
              data: statistical.map(value=>value.quantity),
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
            }]

          }}
          height={100}
          width={200}
          options={{
              maintainAspectRatio: false
          }}
        />
      </LayoutAdmin>
    </Layout>
  );
}
