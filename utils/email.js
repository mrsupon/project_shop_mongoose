import nodemailer from "nodemailer"
import ejs from "ejs"
import Utility from "./utility.js";


class EMail{

        constructor() {
            this.transport = nodemailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                  user: "2368270640cd7c",
                  pass: "15ce7e5aa498f3"
                }
                });
            this.mailOptions = {
                from: '"Example Team" <from@example.com>',
                to: 'supon.sup@gmail.com',
                subject: 'Our Shop',
                text: '',
                html: '',
                attachments: [
                    {
                      //filename: 'chitchat-logo.svg',
                      //path: Utility.getPath('/public/assets/images/chitchat-logo.svg'),
                      //cid: 'uniq-mailtrap.png' 
                    }
                  ]
                };
        }

        send( to = '', subject = '', fileName = '', data = {} ){ 
            const path = Utility.getPath('views/'+fileName);
            ejs.renderFile(path, data, (err, data)=>{
                if(err) 
                  console.log(err);
                else{
                    this.mailOptions.to = to;
                    this.mailOptions.html = data;
                    this.transport.sendMail(this.mailOptions,(err, info) => {
                        if (err)
                          return console.log(err);
                        else
                          return console.log('Message sent: %s', info.messageId);
                    });
                }
            });     
        }

}

export default EMail;