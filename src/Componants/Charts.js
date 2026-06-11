import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
export default function Charts({data}){
return(<>
<BarChart width={600} height={300} data={data}>
  <XAxis dataKey="month" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Bar dataKey="books" fill="#8884d8" />
</BarChart>

</>)
}