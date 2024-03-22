import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../reducer/Product_Reducer'
import axios from "axios"
import ViewProductDetails from './ViewProductDetails'
import { useNavigate } from 'react-router-dom'
import Header1 from '../../MComponent/header/Header'
import ProdutNav from '../ProdutNav'
function SideBar() {
    
    return (
        <>
        <Header1 />
        <ProdutNav />
        <div className='flex mt-4'>

            <div className='h-[1000px] bg-gray-300 w-[300px]'>
            </div>

            <div className='ml-2'>
                {
                    Cards()
                }
            </div>
        </div>
        </>
    )
}



export async function getProductById(id){
    console.log("API ID ",id);
        try {
          const response = await axios.get(`http://localhost:4441/api/v1/product/${id}`);
          console.log("Get API response =>", response.data);
          return response.data;
        } catch (error) {
          console.log("ERROR IN PRODUCT GET API BY ID", error);
          throw error; // Rethrow the error for the calling code to handle
        }
      
}



function Cards() {

    const dispatch = useDispatch()
    const productList = useSelector((state) => state.getProduct.data)
    //  console.log("Product List", productList[0]?.id)
    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])
    var navigate= useNavigate()

    const onClickButton =async(id)=>{
        try {
            console.log("priyanka ",id);
        const data = await getProductById(id);
         navigate('/electronics/info', { state: { data } });   // using useLocation hook 
        } catch (error) {
            console.log("error ==>",error);
        }
        

    }
    return (
        <>
            {/* {  console.log("Dataaaaaaaaaaa==>", productList)  } */}
            {
                productList.map((item, i) => (
                    <div key={i} className='bg-gray-100 h-[300px] w-[1500px] ml-2 flex border border-gray-300'>
                        <div className='mt-6 pt-4' >

                            <img className='h-[180px] mt-6 w-[240px]' src={item?.image} />
                        </div>

                        <div className=' mt-6 w-[940px] pt-4 ml-6' >
                            <h1 className='text-xl' >
                                {item?.description}
                            </h1>
                            <ul className='pl-0 ml-0 list-disc'>
                                <li> AMD Ryzen 7 Octa Core Processor</li>
                                <li>16 GB DDR5 RAM</li>
                                <li>Windows 11 Operating System</li>
                                <li>512 GB SSD</li>
                                <li>39.62 cm (15.6 Inch) Display</li>
                            </ul>
                            <button onClick={()=>onClickButton(item?.id)} className='p-2 mt-8 border border-gray-500 bg-green-400 rounded-md' type='submit'>View more details</button>
                        </div>
                        <div className='pl-28 pt-12'>
                            <h1 className='text-3xl'>{item?.price} /-</h1>
                        </div>

                    </div>

                ))
            }



        </>
    )

}

export default SideBar