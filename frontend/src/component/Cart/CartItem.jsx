
import { Card, Box, Typography, Button, styled } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../../slice/cartSlice';
import GroupButton from './GroupButton';


const Component = styled(Card)`
    border-top: 1px solid #f0f0f0;
    border-radius: 0px;
    display: flex;
`;

const LeftComponent = styled(Box)`
    margin: 20px; 
    display: flex;
    flex-direction: column;
`;

const SmallText = styled(Typography)`
    color: #878787;
    font-size: 14px;
    margin-top: 10px;
`;

const Cost = styled(Typography)`
    font-size: 18px;
    font-weight: 600;
`;

const MRP = styled(Typography)`
    color: #878787;
`;

const Discount = styled(Typography)`
    color: #388E3C;
`;

const Remove = styled(Button)`
    margin-top: 20px;
    font-size: 16px;
`;

const CartItem = () => {
     const dispatch= useDispatch()
    const cart = useSelector(state => state.addCart?.cart);
    const removeItemFromCart = (id) => {
        dispatch(removeFromCart(id));
    }
    useEffect(()=>{
        console.log("Getting data in Cart  =>", cart)

    },[cart])

    const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png';
   
    return (
        <Component>
            {
                cart?.map((item, i)=>(
               <div key={i}>
                    <LeftComponent>
                <img src={item?.image} style={{ height: 110, width: 110 }} />
                <GroupButton />                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
            </LeftComponent>
            <Box style={{ margin: 20 }}>
                <Typography>{item?.price}</Typography>
                <SmallText>Seller:RetailNet
                    <span><img src={fassured} style={{ width: 50, marginLeft: 10 }} /></span>
                </SmallText>
                <Typography style={{margin: '20px 0'}}>
                    <Cost component="span">₹{item?.price} </Cost>&nbsp;&nbsp;&nbsp;
                    <MRP component="span"><strike>₹7000</strike></MRP>&nbsp;&nbsp;&nbsp;
                    <Discount component="span">20 % off</Discount>
                </Typography>
                <Remove onClick={()=>removeItemFromCart(item.id)} >Remove</Remove>
            </Box>
               </div>
                ))
            }
           
        </Component>
    )
}


export default CartItem;