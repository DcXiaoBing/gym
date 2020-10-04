import React, { useEffect } from "react"
import { Table, TableHead, TableRow, TableCell, TableBody, Container } from "@material-ui/core"
import Title from "./Title";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodayOrder } from "../../actions/today.action";

function computeTodayTotal(todayOrders) {
  if(!todayOrders || todayOrders.length === 0) return 0;

  return todayOrders.reduce((pre, cur) => {
    return pre + cur.purchases.reduce((p, c) => {
      return p + c.product.price * c.quantity;
    }, 0)
  }, 0)
}

export default function (props) {

  const dispatch = useDispatch();
  const todayOrdes = useSelector(store => store.todayOrders);

  useEffect(() => {
    dispatch(fetchTodayOrder());
  }, []);

  return (
    <Container maxWidth="sm">
      <Title>Today's Orders. Total Profit: {computeTodayTotal(todayOrdes)}</Title>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todayOrdes.length > 0 && (
            todayOrdes.map((order) => {
              return (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.purchase_date}</TableCell>
                  <TableCell>
                    {order.purchases.reduce((pre, cur) => {
                      return pre + cur.product.price * cur.quantity;
                    }, 0)}
                  </TableCell>
                </TableRow>
              )
            })
          )}
        </TableBody>
      </Table>
    </Container>

  );
}