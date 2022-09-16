import './chart.scss';
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';



const data = [
  { month: "April", total: 4325 },
  { month: "May", total: 3211 },
  { month: "June", total: 3421 },
  { month: "July", total: 7423 },
  { month: "August", total: 1323 },
  { month: "September", total: 4255 },
];


const Chart = ({aspect, title}) => {
  return (
    <div className="chart">
      <div className="title">Last 6 Month {title} </div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" className="chartGrid"/>
          <XAxis dataKey="month" stroke="gray" />
          {/* <YAxis /> */}
          <Tooltip />
          <Area type="monotone" dataKey="total" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart