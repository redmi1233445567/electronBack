// const { ObjectId } = require('mongoose').Types;
// const Technician = require('../models/Technician');
// const Electronic = require('../models/ElectronicPart');

// // exports.getTechnicians = async (req, res) => {
// //   try {
// //       const technicians = await Technician.find(); // جلب جميع الفنيين
// //       res.status(200).json({
// //           success: true,
// //           count: technicians.length,
// //           data: technicians,
// //       });
// //   } catch (err) {
// //       res.status(500).json({
// //           success: false,
// //           message: 'حدث خطأ أثناء جلب الفنيين',
// //           error: err.message,
// //       });
// //   }
// // };
// exports.getTechnicians = async (req, res) => {
//   try {
//     const technicians = await Technician.find();
//     res.status(200).json({
//       success: true,
//       count: technicians.length,
//       data: technicians,
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// };
// // exports.getTechnicianById = async (req, res) => {
// //   try {
// //     const technician = await Technician.findById(req.params.id);
// //     if (!technician) {
// //       return res.status(404).json({ success: false, message: 'Technician not found' });
// //     }
// //     res.status(200).json({ success: true, data: technician });
// //   } catch (err) {
// //     res.status(500).json({ success: false, error: err.message });
// //   }
// // };

// exports.getTechnicianById = async (req, res) => {
//   try {
//     const technician = await Technician.findById(req.params.id);
//     if (!technician) {
//       return res.status(404).json({ success: false, message: 'Technician not found' });
//     }
//     res.status(200).json({ success: true, data: technician });
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// };
// // exports.addTechnician = async (req, res) => {
// //   const { name } = req.body;
// //   try {
// //     const technician = new Technician({ name });
// //     await technician.save();
// //     res.status(201).json(technician);
// //   } catch (err) {
// //     res.status(400).json({ error: err.message });
// //   }
// // };

// // exports.addTechnician = async (req, res) => {
// //   try {
// //     const technician = new Technician(req.body);
// //     await technician.save();
// //     res.status(201).json({ success: true, data: technician });
// //   } catch (err) {
// //     res.status(400).json({ success: false, error: err.message });
// //   }
// // };
// exports.addTechnician = async (req, res) => {
//   try {
//     const { name, phone, email, status } = req.body;

//     // التحقق من الحقول المطلوبة
//     if (!name || !phone) {
//       return res.status(400).json({
//         success: false,
//         message: 'يرجى توفير الاسم ورقم الهاتف',
//       });
//     }

//     // التحقق من وجود الفني (اختياري)
//     const existingTechnician = await Technician.findOne({ phone });
//     if (existingTechnician) {
//       return res.status(400).json({
//         success: false,
//         message: 'رقم الهاتف موجود بالفعل',
//       });
//     }

//     const technician = new Technician({
//       name,
//       phone,
//       email: email || '',
//       status: status || 'active',
//       invoices: [],
//       totalDueAmount: 0,
//     });

//     await technician.save();

//     res.status(201).json({
//       success: true,
//       data: technician,
//     });
//   } catch (err) {
//     res.status(400).json({
//       success: false,
//       message: 'خطأ أثناء إضافة الفني',
//       error: err.message,
//     });
//   }
// };


// exports.updateTechnician = async (req, res) => {
//   try {
//     const technician = await Technician.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!technician) {
//       return res.status(404).json({ success: false, message: 'Technician not found' });
//     }
//     res.status(200).json({ success: true, data: technician });
//   } catch (err) {
//     res.status(400).json({ success: false, error: err.message });
//   }
// };

// exports.deleteTechnician = async (req, res) => {
//   try {
//     // البحث عن الفني وحذفه باستخدام المعرف
//     const technician = await Technician.findByIdAndDelete(req.params.id);
    
//     // إذا لم يتم العثور على الفني، أرجع رمز الحالة 404
//     if (!technician) {
//       return res.status(404).json({ success: false, error: 'Technician not found' });
//     }

//     // إذا تم الحذف بنجاح، أرجع استجابة نجاح
//     res.status(200).json({ success: true, message: 'Technician deleted successfully' });
//   } catch (err) {
//     // في حالة حدوث خطأ (مثل معرف غير صالح أو مشكلة في قاعدة البيانات)
//     console.error('Error deleting technician:', err);
//     res.status(400).json({ success: false, error: err.message });
//   }
// };



// exports.addInvoiceToTechnician = async (req, res) => {
//   try {
//     console.log("POST /technicians/:technicianId/invoices - Received technicianId:", req.params.technicianId);
//     const technicianId = req.params.technicianId.trim(); // إزالة أي مسافات

//     // التحقق من صلاحية المعرف يدويًا
//     const isValidObjectId = (id) => {
//       return /^[0-9a-fA-F]{24}$/.test(id);
//     };

//     if (!isValidObjectId(technicianId)) {
//       console.log("POST /technicians/:technicianId/invoices - Invalid technicianId:", technicianId);
//       return res.status(400).json({
//         success: false,
//         message: 'معرف الفني غير صالح',
//       });
//     }

//     // البحث عن الفني
//     const technician = await Technician.findById(technicianId).exec();
//     if (!technician) {
//       console.log("POST /technicians/:technicianId/invoices - Technician not found for ID:", technicianId);
//       return res.status(404).json({
//         success: false,
//         message: 'الفني غير موجود',
//       });
//     }
//     console.log("POST /technicians/:technicianId/invoices - Technician found:", technician);

//     const { date, items } = req.body;
//     console.log("POST /technicians/:technicianId/invoices - Received body:", req.body);
//     if (!date || !items || !Array.isArray(items) || items.length === 0) {
//       console.log("POST /technicians/:technicianId/invoices - Invalid invoice data");
//       return res.status(400).json({
//         success: false,
//         message: 'بيانات الفاتورة غير صالحة',
//       });
//     }

//     const invoice = { date: new Date(date), items };
//     technician.invoices.push(invoice);

//     let totalDueAmount = technician.totalDueAmount || 0;
//     items.forEach((item) => {
//       totalDueAmount += item.remainingAmount || (item.quantity * item.price - (item.paidAmount || 0));
//     });
//     technician.totalDueAmount = totalDueAmount;

//     await technician.save();
//     console.log("POST /technicians/:technicianId/invoices - Invoice added successfully");

//     res.status(201).json({
//       success: true,
//       data: technician,
//     });
//   } catch (err) {
//     console.error("POST /technicians/:technicianId/invoices - Error:", err.message);
//     res.status(500).json({
//       success: false,
//       message: 'خطأ أثناء إضافة الفاتورة',
//       error: err.message,
//     });
//   }
// };

// exports.makePayment = async (req, res) => {
//   try {
//     const technician = await Technician.findById(req.params.id);
//     if (!technician) {
//       return res.status(404).json({ success: false, message: 'Technician not found' });
//     }

//     let remainingPayment = req.body.amount;
//     for (let invoice of technician.invoices) {
//       if (remainingPayment <= 0) break;

//       if (invoice.remainingAmount > 0) {
//         const paymentForInvoice = Math.min(remainingPayment, invoice.remainingAmount);
//         invoice.remainingAmount -= paymentForInvoice;
//         remainingPayment -= paymentForInvoice;
//       }
//     }

//     technician.totalDebt = technician.invoices.reduce((total, invoice) => total + invoice.remainingAmount, 0);
//     await technician.save();

//     res.status(200).json({ success: true, data: technician });
//   } catch (err) {
//     res.status(400).json({ success: false, error: err.message });
//   }
// };


// exports.payAmountToTechnician = async (req, res) => {
//   try {
//     const technician = await Technician.findById(req.params.id);
//     if (!technician) {
//       return res.status(404).json({ success: false, error: 'Technician not found' });
//     }

//     const { amount } = req.body;
//     if (typeof amount !== 'number' || amount <= 0) {
//       return res.status(400).json({ success: false, error: 'Invalid payment amount' });
//     }

//     if (amount > technician.totalDueAmount) {
//       return res.status(400).json({ success: false, error: 'Payment amount exceeds total due amount' });
//     }

//     technician.totalDueAmount -= amount;
//     await technician.save();
//     res.status(200).json({ success: true, data: technician });
//   } catch (err) {
//     res.status(400).json({ success: false, error: err.message });
//   }
// };

// exports.filterInvoices = async (req, res) => {
//   const { startDate, endDate } = req.query;
//   try {
//     const technicians = await Technician.find({
//       'invoices.date': { $gte: new Date(startDate), $lte: new Date(endDate) },
//     });
//     res.status(200).json(technicians);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };


// exports.getInvoicesSummary = async (req, res) => {
//   try {
//     const technicians = await Technician.find().populate('invoices');

//     const summary = technicians.map((technician) => {
//       const totalInvoices = technician.invoices.length;
//       const totalAmountPaid = technician.invoices.reduce((sum, invoice) => sum + invoice.amountPaid, 0);
//       const totalRemainingAmount = technician.invoices.reduce((sum, invoice) => sum + invoice.remainingAmount, 0);

//       return {
//         technician: technician.name,
//         totalInvoices,
//         totalAmountPaid,
//         totalRemainingAmount,
//         invoices: technician.invoices,
//       };
//     });

//     res.status(200).json(summary);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


// exports.filterInvoicesByTechnician = async (req, res) => {
//   const { technicianId } = req.params;
//   try {
//     const technician = await Technician.findById(technicianId).populate('invoices');
//     if (!technician) {
//       return res.status(404).json({ error: 'Technician not found' });
//     }
//     res.status(200).json(technician.invoices);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// const PDFDocument = require('pdfkit');
// const fs = require('fs');

// exports.exportInvoicesPDF = async (req, res) => {
//   try {
//     const technicians = await Technician.find().populate('invoices');

//     const doc = new PDFDocument();
//     res.setHeader('Content-Type', 'application/pdf');
//     res.setHeader('Content-Disposition', 'attachment; filename=invoices.pdf');

//     doc.pipe(res);

//     technicians.forEach((technician) => {
//       doc.text(`Technician: ${technician.name}`);
//       technician.invoices.forEach((invoice, index) => {
//         doc.text(`Invoice ${index + 1}:`);
//         doc.text(`Part Name: ${invoice.partName}`);
//         doc.text(`Quantity: ${invoice.quantity}`);
//         doc.text(`Price: ${invoice.price}`);
//         doc.text(`Amount Paid: ${invoice.amountPaid}`);
//         doc.text(`Remaining Amount: ${invoice.remainingAmount}`);
//         doc.text(`Total Remaining: ${invoice.totalRemaining}`);
//         doc.text(`Date: ${invoice.date}`);
//         doc.moveDown();
//       });
//     });

//     doc.end();
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


// const ExcelJS = require('exceljs');

// exports.exportInvoicesExcel = async (req, res) => {
//   try {
//     const technicians = await Technician.find().populate('invoices');

//     const workbook = new ExcelJS.Workbook();
//     const worksheet = workbook.addWorksheet('Invoices');

//     worksheet.columns = [
//       { header: 'Technician', key: 'technician', width: 20 },
//       { header: 'Part Name', key: 'partName', width: 20 },
//       { header: 'Quantity', key: 'quantity', width: 15 },
//       { header: 'Price', key: 'price', width: 15 },
//       { header: 'Amount Paid', key: 'amountPaid', width: 15 },
//       { header: 'Remaining Amount', key: 'remainingAmount', width: 20 },
//       { header: 'Total Remaining', key: 'totalRemaining', width: 20 },
//       { header: 'Date', key: 'date', width: 20 },
//     ];

//     technicians.forEach((technician) => {
//       technician.invoices.forEach((invoice) => {
//         worksheet.addRow({
//           technician: technician.name,
//           partName: invoice.partName,
//           quantity: invoice.quantity,
//           price: invoice.price,
//           amountPaid: invoice.amountPaid,
//           remainingAmount: invoice.remainingAmount,
//           totalRemaining: invoice.totalRemaining,
//           date: invoice.date,
//         });
//       });
//     });

//     res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
//     res.setHeader('Content-Disposition', 'attachment; filename=invoices.xlsx');

//     await workbook.xlsx.write(res);
//     res.end();
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };



// exports.exportInvoicesSummaryPDF = async (req, res) => {
//   try {
//     const technicians = await Technician.find().populate('invoices');

//     const doc = new PDFDocument();
//     res.setHeader('Content-Type', 'application/pdf');
//     res.setHeader('Content-Disposition', 'attachment; filename=invoices_summary.pdf');

//     doc.pipe(res);

//     technicians.forEach((technician) => {
//       doc.text(`Technician: ${technician.name}`);
//       doc.text(`Total Invoices: ${technician.invoices.length}`);
//       doc.text(`Total Amount Paid: ${technician.invoices.reduce((sum, invoice) => sum + invoice.amountPaid, 0)}`);
//       doc.text(`Total Remaining Amount: ${technician.invoices.reduce((sum, invoice) => sum + invoice.remainingAmount, 0)}`);
//       doc.moveDown();
//     });

//     doc.end();
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.exportInvoicesSummaryExcel = async (req, res) => {
//   try {
//     const technicians = await Technician.find().populate('invoices');

//     const workbook = new ExcelJS.Workbook();
//     const worksheet = workbook.addWorksheet('Invoices Summary');

//     worksheet.columns = [
//       { header: 'Technician', key: 'technician', width: 20 },
//       { header: 'Total Invoices', key: 'totalInvoices', width: 15 },
//       { header: 'Total Amount Paid', key: 'totalAmountPaid', width: 20 },
//       { header: 'Total Remaining Amount', key: 'totalRemainingAmount', width: 20 },
//     ];

//     technicians.forEach((technician) => {
//       worksheet.addRow({
//         technician: technician.name,
//         totalInvoices: technician.invoices.length,
//         totalAmountPaid: technician.invoices.reduce((sum, invoice) => sum + invoice.amountPaid, 0),
//         totalRemainingAmount: technician.invoices.reduce((sum, invoice) => sum + invoice.remainingAmount, 0),
//       });
//     });

//     res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
//     res.setHeader('Content-Disposition', 'attachment; filename=invoices_summary.xlsx');

//     await workbook.xlsx.write(res);
//     res.end();
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };



// exports.filterInvoicesByStatus = async (req, res) => {
//   const { status } = req.query; // status: 'debtor' أو 'creditor'
//   try {
//     const technicians = await Technician.find({
//       'invoices.isDebtor': status === 'debtor',
//     }).populate('invoices');
//     res.status(200).json(technicians);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };



// const transporter = require('../config/nodemailer');

// exports.sendLateInvoicesNotifications = async (req, res) => {
//   try {
//     const technicians = await Technician.find().populate('invoices');

//     technicians.forEach((technician) => {
//       technician.invoices.forEach((invoice) => {
//         if (new Date(invoice.date) < new Date()) {
//           const mailOptions = {
//             from: process.env.EMAIL_USER,
//             to: technician.email, // تأكد من وجود حقل email في نموذج الفني
//             subject: 'فاتورة متأخرة',
//             text: `الفاتورة ${invoice.partName} متأخرة. الرجاء السداد في أقرب وقت ممكن.`,
//           };

//           transporter.sendMail(mailOptions, (err, info) => {
//             if (err) {
//               console.error('Error sending email:', err);
//             } else {
//               console.log('Email sent:', info.response);
//             }
//           });
//         }
//       });
//     });

//     res.status(200).json({ message: 'Notifications sent successfully' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.getGeneralStatistics = async (req, res) => {
//   try {
//     const technicians = await Technician.find().populate('invoices');

//     const totalInvoices = technicians.reduce((sum, technician) => sum + technician.invoices.length, 0);
//     const totalAmountPaid = technicians.reduce((sum, technician) => sum + technician.invoices.reduce((sum, invoice) => sum + invoice.amountPaid, 0), 0);
//     const totalRemainingAmount = technicians.reduce((sum, technician) => sum + technician.invoices.reduce((sum, invoice) => sum + invoice.remainingAmount, 0), 0);
//     const debtorsCount = technicians.filter((technician) => technician.invoices.some((invoice) => invoice.isDebtor)).length;
//     const creditorsCount = technicians.length - debtorsCount;

//     res.status(200).json({
//       totalInvoices,
//       totalAmountPaid,
//       totalRemainingAmount,
//       debtorsCount,
//       creditorsCount,
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };




const Technician = require('../models/Technician');
const Electronic = require('../models/ElectronicPart');
const mongoose = require('mongoose');


exports.getTechnicians = async (req, res) => {
  try {
    const technicians = await Technician.find();
    res.status(200).json({ success: true, data: technicians });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getTechnicianById = async (req, res) => {
  try {
    const technician = await Technician.findById(req.params.id);
    if (!technician) {
      return res.status(404).json({ success: false, message: "Technician not found" });
    }
    res.status(200).json({ success: true, data: technician });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


exports.addTechnician = async (req, res) => {
  try {
    const technician = new Technician(req.body);
    await technician.save();
    res.status(201).json({ success: true, data: technician });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.updateTechnician = async (req, res) => {
  try {
    const technician = await Technician.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!technician) {
      return res.status(404).json({ success: false, message: 'Technician not found' });
    }
    res.status(200).json({ success: true, data: technician });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.deleteTechnician = async (req, res) => {
  try {
    const technician = await Technician.findByIdAndDelete(req.params.id);
    if (!technician) {
      return res.status(404).json({ success: false, message: 'Technician not found' });
    }
    res.status(200).json({ success: true, message: 'Technician deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.addInvoiceToTechnician = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const technician = await Technician.findById(req.params.technicianId).session(session);
    if (!technician) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ 
        success: false, 
        message: 'الفني غير موجود' 
      });
    }

    const { date, items } = req.body;

    // التحقق من كفاية المخزون أولاً
    const electronicParts = await Promise.all(
      items.map(item => Electronic.findById(item.partId).session(session))
    );

    // التحقق من وجود جميع القطع
    const missingParts = electronicParts.filter(part => !part);
    if (missingParts.length > 0) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ 
        success: false, 
        message: 'بعض القطع الإلكترونية غير موجودة' 
      });
    }

    // التحقق من كفاية المخزون
    for (let i = 0; i < items.length; i++) {
      if (electronicParts[i].quantity < items[i].quantity) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({ 
          success: false, 
          message: `الكمية غير كافية للقطعة ${electronicParts[i].name}` 
        });
      }
    }

    // تحديث المخزون
    for (let i = 0; i < items.length; i++) {
      electronicParts[i].quantity -= items[i].quantity;
      await electronicParts[i].save({ session });
    }

    // حساب المبلغ المستحق
    const invoiceTotal = items.reduce(
      (sum, item) => sum + (item.quantity * item.price - (item.paidAmount || 0)), 
      0
    );

    // إضافة الفاتورة
    const newInvoice = {
      date,
      items: items.map(item => ({
        ...item,
        remainingAmount: item.quantity * item.price - (item.paidAmount || 0)
      }))
    };

    technician.invoices.push(newInvoice);
    technician.totalDueAmount += invoiceTotal;

    // حفظ التغييرات
    await technician.save({ session });

    // تأكيد المعاملة
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ 
      success: true, 
      data: technician 
    });

  } catch (err) {
    // إلغاء المعاملة في حالة حدوث خطأ
    await session.abortTransaction();
    session.endSession();
    
    console.error('Error adding invoice:', err);
    res.status(400).json({ 
      success: false, 
      message: 'حدث خطأ أثناء إضافة الفاتورة',
      error: err.message 
    });
  }
};

exports.payAmountToTechnician = async (req, res) => {
  try {
    const technician = await Technician.findById(req.params.id);
    if (!technician) {
      return res.status(404).json({ success: false, message: 'Technician not found' });
    }

    const { amount } = req.body;
    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid payment amount' });
    }

    if (amount > technician.totalDueAmount) {
      return res.status(400).json({ success: false, message: 'Payment amount exceeds total due amount' });
    }

    technician.totalDueAmount -= amount;
    technician.payments.push({ amount, date: new Date() });
    await technician.save();

    res.status(200).json({ success: true, message: 'Payment recorded successfully', data: technician });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.filterInvoicesByTechnician = async (req, res) => {
  try {
    const technician = await Technician.findById(req.params.technicianId);
    if (!technician) {
      return res.status(404).json({ success: false, message: 'Technician not found' });
    }
    res.status(200).json({ success: true, data: technician.invoices });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.filterInvoices = async (req, res) => {
  try {
    const { startDate, endDate, technicianId } = req.query;
    let query = {};
    if (technicianId) {
      query._id = technicianId;
    }
    const technicians = await Technician.find(query);
    let invoices = [];
    technicians.forEach((technician) => {
      technician.invoices.forEach((invoice) => {
        const invoiceDate = new Date(invoice.date);
        if (
          (!startDate || invoiceDate >= new Date(startDate)) &&
          (!endDate || invoiceDate <= new Date(endDate))
        ) {
          invoices.push({ ...invoice.toObject(), technicianId: technician._id });
        }
      });
    });
    res.status(200).json({ success: true, data: invoices });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.filterInvoicesByStatus = async (req, res) => {
  try {
    const { status } = req.query;
    const technicians = await Technician.find();
    let invoices = [];
    technicians.forEach((technician) => {
      technician.invoices.forEach((invoice) => {
        const totalRemaining = invoice.items.reduce(
          (sum, item) => sum + item.remainingAmount,
          0
        );
        const invoiceStatus = totalRemaining === 0 ? 'paid' : 'unpaid';
        if (!status || invoiceStatus === status) {
          invoices.push({ ...invoice.toObject(), technicianId: technician._id });
        }
      });
    });
    res.status(200).json({ success: true, data: invoices });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getInvoicesSummary = async (req, res) => {
  try {
    const technicians = await Technician.find();
    let totalInvoices = 0;
    let totalAmount = 0;
    let totalPaid = 0;
    let totalRemaining = 0;

    technicians.forEach((technician) => {
      technician.invoices.forEach((invoice) => {
        totalInvoices += 1;
        invoice.items.forEach((item) => {
          totalAmount += item.quantity * item.price;
          totalPaid += item.paidAmount;
          totalRemaining += item.remainingAmount;
        });
      });
    });

    res.status(200).json({
      success: true,
      data: { totalInvoices, totalAmount, totalPaid, totalRemaining },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.exportInvoicesPDF = async (req, res) => {
  res.status(501).json({ success: false, message: 'Not implemented' });
};

exports.exportInvoicesExcel = async (req, res) => {
  res.status(501).json({ success: false, message: 'Not implemented' });
};

exports.exportInvoicesSummaryPDF = async (req, res) => {
  res.status(501).json({ success: false, message: 'Not implemented' });
};

exports.exportInvoicesSummaryExcel = async (req, res) => {
  res.status(501).json({ success: false, message: 'Not implemented' });
};

exports.sendLateInvoicesNotifications = async (req, res) => {
  res.status(501).json({ success: false, message: 'Not implemented' });
};

exports.getGeneralStatistics = async (req, res) => {
  try {
    const technicians = await Technician.find();
    const totalTechnicians = technicians.length;
    const activeTechnicians = technicians.filter(t => t.status === 'active').length;
    const inactiveTechnicians = totalTechnicians - activeTechnicians;

    let totalInvoices = 0;
    let totalAmount = 0;
    let totalPaid = 0;
    let totalRemaining = 0;

    technicians.forEach((technician) => {
      technician.invoices.forEach((invoice) => {
        totalInvoices += 1;
        invoice.items.forEach((item) => {
          totalAmount += item.quantity * item.price;
          totalPaid += item.paidAmount;
          totalRemaining += item.remainingAmount;
        });
      });
    });

    res.status(200).json({
      success: true,
      data: {
        totalTechnicians,
        activeTechnicians,
        inactiveTechnicians,
        totalInvoices,
        totalAmount,
        totalPaid,
        totalRemaining,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.deleteInvoice = async (req, res) => {
  try {
    const { technicianId, invoiceId } = req.params;
    
    // البحث عن الفني
    const technician = await Technician.findById(technicianId);
    if (!technician) {
      return res.status(404).json({ 
        success: false, 
        message: 'الفني غير موجود' 
      });
    }

    // البحث عن الفاتورة
    const invoiceIndex = technician.invoices.findIndex(
      invoice => invoice._id.toString() === invoiceId
    );
    
    if (invoiceIndex === -1) {
      return res.status(404).json({ 
        success: false, 
        message: 'الفاتورة غير موجودة' 
      });
    }

    // الحصول على الفاتورة قبل حذفها
    const deletedInvoice = technician.invoices[invoiceIndex];

    // تحديث كمية المخزون للقطع الإلكترونية
    for (const item of deletedInvoice.items) {
      const electronic = await Electronic.findById(item.partId);
      if (electronic) {
        electronic.quantity += item.quantity;
        await electronic.save();
      }
    }

    // حساب المبلغ المستحق من الفاتورة المحذوفة
    const invoiceTotal = deletedInvoice.items.reduce(
      (sum, item) => sum + (item.quantity * item.price - (item.paidAmount || 0)), 
      0
    );

    // تحديث المبلغ الكلي المستحق للفني
    technician.totalDueAmount -= invoiceTotal;

    // حذف الفاتورة
    technician.invoices.splice(invoiceIndex, 1);
    
    // حفظ التغييرات
    await technician.save();

    res.status(200).json({ 
      success: true, 
      message: 'تم حذف الفاتورة بنجاح',
      data: {
        technician,
        deletedInvoice
      }
    });

  } catch (err) {
    console.error('Error deleting invoice:', err);
    res.status(500).json({ 
      success: false, 
      message: 'حدث خطأ أثناء حذف الفاتورة',
      error: err.message 
    });
  }
};

exports.updateInvoice = async (req, res) => {
  try {
    const { technicianId, invoiceId } = req.params;
    const { date, items } = req.body;

    // البحث عن الفني
    const technician = await Technician.findById(technicianId);
    if (!technician) {
      return res.status(404).json({
        success: false,
        message: 'الفني غير موجود'
      });
    }

    // البحث عن الفاتورة
    const invoiceIndex = technician.invoices.findIndex(
      invoice => invoice._id.toString() === invoiceId
    );

    if (invoiceIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'الفاتورة غير موجودة'
      });
    }

    // الحصول على الفاتورة القديمة
    const oldInvoice = technician.invoices[invoiceIndex];

    // إعادة كمية المخزون للقطع الإلكترونية القديمة
    for (const item of oldInvoice.items) {
      const electronic = await Electronic.findById(item.partId);
      if (electronic) {
        electronic.quantity += item.quantity;
        await electronic.save();
      }
    }

    // حساب المبلغ المستحق من الفاتورة القديمة
    const oldInvoiceTotal = oldInvoice.items.reduce(
      (sum, item) => sum + (item.quantity * item.price - (item.paidAmount || 0)),
      0
    );

    // تحديث المبلغ الكلي المستحق للفني (طرح المبلغ القديم)
    technician.totalDueAmount -= oldInvoiceTotal;

    // التحقق من كفاية المخزون للقطع الجديدة
    for (const item of items) {
      const electronic = await Electronic.findById(item.partId);
      if (!electronic) {
        return res.status(404).json({
          success: false,
          message: `القطعة الإلكترونية برقم ${item.partId} غير موجودة`
        });
      }
      if (electronic.quantity < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `الكمية غير كافية للقطعة ${electronic.name}`
        });
      }
      electronic.quantity -= item.quantity;
      await electronic.save();
    }

    // حساب المبلغ المستحق من الفاتورة الجديدة
    const newInvoiceTotal = items.reduce(
      (sum, item) => sum + (item.quantity * item.price - (item.paidAmount || 0)),
      0
    );

    // تحديث المبلغ الكلي المستحق للفني (إضافة المبلغ الجديد)
    technician.totalDueAmount += newInvoiceTotal;

    // تحديث الفاتورة
    technician.invoices[invoiceIndex] = {
      ...technician.invoices[invoiceIndex],
      date: date || oldInvoice.date,
      items: items
    };

    // حفظ التغييرات
    await technician.save();

    res.status(200).json({
      success: true,
      message: 'تم تحديث الفاتورة بنجاح',
      data: {
        technician,
        updatedInvoice: technician.invoices[invoiceIndex]
      }
    });

  } catch (err) {
    console.error('Error updating invoice:', err);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ أثناء تحديث الفاتورة',
      error: err.message
    });
  }
};

exports.deletePayment = async (req, res) => {
  try {
    const { technicianId, paymentId } = req.params;
    
    // البحث عن الفني
    const technician = await Technician.findById(technicianId);
    if (!technician) {
      return res.status(404).json({
        success: false,
        message: 'الفني غير موجود'
      });
    }

    // البحث عن سند القبض
    const paymentIndex = technician.payments.findIndex(
      payment => payment._id.toString() === paymentId
    );

    if (paymentIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'سند القبض غير موجود'
      });
    }

    // الحصول على سند القبض قبل حذفه
    const deletedPayment = technician.payments[paymentIndex];

    // إعادة المبلغ إلى المبلغ المستحق للفني
    technician.totalDueAmount += deletedPayment.amount;

    // حذف سند القبض
    technician.payments.splice(paymentIndex, 1);

    // حفظ التغييرات
    await technician.save();

    res.status(200).json({
      success: true,
      message: 'تم حذف سند القبض بنجاح',
      data: {
        technician,
        deletedPayment
      }
    });

  } catch (err) {
    console.error('Error deleting payment:', err);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ أثناء حذف سند القبض',
      error: err.message
    });
  }
};

exports.updatePayment = async (req, res) => {
  try {
    const { technicianId, paymentId } = req.params;
    const { amount, date } = req.body;

    // التحقق من صحة البيانات
    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'المبلغ غير صالح'
      });
    }

    // البحث عن الفني
    const technician = await Technician.findById(technicianId);
    if (!technician) {
      return res.status(404).json({
        success: false,
        message: 'الفني غير موجود'
      });
    }

    // البحث عن سند القبض
    const paymentIndex = technician.payments.findIndex(
      payment => payment._id.toString() === paymentId
    );

    if (paymentIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'سند القبض غير موجود'
      });
    }

    // الحصول على سند القبض القديم
    const oldPayment = technician.payments[paymentIndex];

    // إعادة المبلغ القديم إلى المبلغ المستحق للفني
    technician.totalDueAmount += oldPayment.amount;

    // التحقق من أن المبلغ الجديد لا يتجاوز المبلغ المستحق
    if (amount > technician.totalDueAmount) {
      return res.status(400).json({
        success: false,
        message: 'المبلغ الجديد يتجاوز المبلغ المستحق'
      });
    }

    // خصم المبلغ الجديد من المبلغ المستحق
    technician.totalDueAmount -= amount;

    // تحديث سند القبض
    technician.payments[paymentIndex] = {
      ...technician.payments[paymentIndex],
      amount,
      date: date || oldPayment.date
    };

    // حفظ التغييرات
    await technician.save();

    res.status(200).json({
      success: true,
      message: 'تم تحديث سند القبض بنجاح',
      data: {
        technician,
        updatedPayment: technician.payments[paymentIndex]
      }
    });

  } catch (err) {
    console.error('Error updating payment:', err);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ أثناء تحديث سند القبض',
      error: err.message
    });
  }
};