// const mongoose = require('mongoose');

// const technicianSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   // email: { type: String, required: true }, // تأكد من إضافة حقل email
//   invoices: [{
//     partName: { type: String, required: true },
//     quantity: { type: Number, required: true },
//     price: { type: Number, required: true },
//     amountPaid: { type: Number, required: true },
//     remainingAmount: { type: Number, required: true },
//     totalRemaining: { type: Number, required: true },
//     date: { type: Date, default: Date.now },
//     isDebtor: { type: Boolean, default: false },
//   }],
// });

// module.exports = mongoose.model('Technician', technicianSchema);



// models/Technician.js
// const mongoose = require('mongoose');

// const itemSchema = new mongoose.Schema({
//   partId: { type: String, required: true },
//   partName: { type: String, required: true },
//   quantity: { type: Number, required: true, min: 0 },
//   price: { type: Number, required: true, min: 0 },
//   paidAmount: { type: Number, default: 0, min: 0 },
//   remainingAmount: { type: Number, default: 0, min: 0 },
// });

// const invoiceSchema = new mongoose.Schema({
//   date: { type: Date, required: true },
//   items: [itemSchema],
// });

// const technicianSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   phone: { type: String, required: true },
//   email: { type: String, default: '' },
//   status: { type: String, default: 'active' },
//   invoices: [invoiceSchema],
//   totalDueAmount: { type: Number, default: 0, min: 0 },
// });


// module.exports = mongoose.model('Technician', technicianSchema);


const mongoose = require('mongoose');

const technicianSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    // trim: true,
  },
  phone: {
    type: String,
    required: true,
    // trim: true,
  },
  email: {
    type: String,
    // trim: true,
    default: '',
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  invoices: [
    {
      date: {
        type: Date,
        required: true,
      },
      items: [
        {
          partId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Electronic',
            required: true,
          },
          partName: {
            type: String,
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
          },
          price: {
            type: Number,
            required: true,
          },
          paidAmount: {
            type: Number,
            default: 0,
          },
          remainingAmount: {
            type: Number,
            default: 0,
          },
        },
      ],
    },
  ],
  payments: [
    {
      amount: {
        type: Number,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  totalDueAmount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Technician', technicianSchema);