import User from "../../models/mongoose/user.js"
import Order from "../../models/mongoose/order.js"
import path from "path"
import fs from "fs"
import Pdfkit from "pdfkit"

class InvoiceController{

    static show(req, res){ 
        const orderId = req.params.id ; 
        const invoiceName = "invoice-"+orderId+".pdf";
        const invoicePath = path.join('documents', 'invoices', invoiceName);
        Order.findById(orderId)
        .populate('orderDetails.productId', 'title price description imageUrl')
        .then((order)=>{  
            if(!order){
                req.flash('error', 'Order was not found');
                return res.render('404.ejs', { pageTitle: '404', path: '/404', messages: req.flash()});                
            }
            if(order.userId.toString() !== (req.session.user._id).toString() ){   //Authorization
                req.flash('error', 'Unauthorized'); console.log('unauthorized');
                return res.render('404.ejs', { pageTitle: '404', path: '/404', messages: req.flash()});  
            } 
        //1.//only download ///////////////
        // fs.readFile( invoicePath, (err, data)=>{
        //     if(err){
        //         req.flash('error', 'File was not found');
        //         return res.render('404.ejs', { pageTitle: '404', path: '/404', messages: req.flash()}); 
        //     }
        //     res.download(invoicePath);
        // });
        // })
        // .catch( err=>console.log(err) );
        ///////////////////////////////////// 
        //2.//open pdf on browser ///////////
        // fs.readFile( invoicePath, (err, data)=>{
        //     if(err){
        //         req.flash('error', 'File was not found');
        //         return res.render('404.ejs', { pageTitle: '404', path: '/404', messages: req.flash()}); 
        //     }
        //     res.setHeader('Content-Type', 'application/pdf'); 
        //     res.setHeader(
        //         'Content-Disposition', 'inline; fileName="'+invoiceName+'"'
        //     );
        //     res.send(data);
        // });
        // })
        // .catch( err=>console.log(err) );
        /////////////////////////////////////        
        //3.// use stream for big file  /////
        //     const file = fs.createReadStream( invoicePath );
        //     res.setHeader('Content-Type', 'application/pdf'); 
        //     res.setHeader(
        //         'Content-Disposition', 'inline; fileName="'+invoiceName+'"'
        //     ); 
        //     file.pipe(res);
        // })
        // .catch( err=>console.log(err) ); 
        ///////////////////////////////////// 
            res.setHeader('Content-Type', 'application/pdf'); 
            res.setHeader(
                'Content-Disposition', 'inline; fileName="'+invoiceName+'"'
            );
            let x = 30;
            let y = 30;
            let h = 20;
            let w = 100;
            let t1 = 50; let t2 = 150; let t3 = 350; let t4 = 400; let t5 = 450;
            const pdf = new Pdfkit({size: 'A4'});
            pdf.pipe(fs.createWriteStream(invoicePath));
            pdf.pipe(res);    

            pdf.fontSize(20).text('I N V O I C E',x,y+=20 );
            pdf.fontSize(8).text('Order# '+orderId,x+t3,y, {width:190, align: 'right'}); 

            pdf.fontSize(12)
            pdf.text('No.',x,y+=30, {width:29, align: 'right'}); 
            pdf.text('Title',x+t1,y);
            pdf.text('Description',x+t2,y); 
            pdf.text('Price',x+t3,y, {width:50, align: 'right'});   
            pdf.text('Qty.',x+t4,y, {width:50, align: 'right'}); 
            pdf.text('Amount',x+t5,y, {width:90, align: 'right'});  

            pdf.moveTo(30, y+=20).lineTo(570, y).stroke(); ; 

            let no = 1;
            let sum = 0;
            let total = 0;
            order.orderDetails.forEach(orderDetail=>{
                sum = orderDetail.quantity*orderDetail.productId.price ;
                total += sum;
                pdf.fontSize(12)
                pdf.text(no++,x,y+=20, {width:29, align: 'right'}); 
                pdf.text(orderDetail.productId.title,x+t1,y);
                pdf.text(orderDetail.productId.description,x+t2,y);
                pdf.text(orderDetail.productId.price,x+t3,y, {width:50, align: 'right'});   
                pdf.text(orderDetail.quantity,x+t4,y, {width:50, align: 'right'});  
                pdf.text(sum,x+t5,y, {width:90, align: 'right'});            
            });
            pdf.moveTo(30, y+=20).lineTo(570, y).stroke(); ;

            pdf.text('total',x+t4,y+=20, {width:50, align: 'right'});  
            pdf.text(total,x+t5,y, {width:90, align: 'right'});  

            pdf.moveTo(30, y+=20).lineTo(570, y).stroke(); ;

            pdf.end();
        })
        .catch( err=>console.log(err) ); 
    }


}

export default InvoiceController;