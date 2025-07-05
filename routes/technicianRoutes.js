const express = require('express');
const router = express.Router();
const technicianController = require('../controllers/technicianController');

// جلب جميع الفنيين
router.get('/', technicianController.getTechnicians);

// جلب فني معين باستخدام المعرف
router.get('/:id', technicianController.getTechnicianById);

// إضافة فني جديد
router.post('/', technicianController.addTechnician);

// تحديث بيانات فني
router.put('/:id', technicianController.updateTechnician);

// حذف فني
router.delete('/:id', technicianController.deleteTechnician);

// إضافة فاتورة لفني
router.post('/:technicianId/invoices', technicianController.addInvoiceToTechnician);

router.delete('/:technicianId/invoices/:invoiceId', technicianController.deleteInvoice);
router.put('/:technicianId/invoices/:invoiceId', technicianController.updateInvoice);

// سداد مبلغ لفني
router.post('/:id/pay', technicianController.payAmountToTechnician);

// جلب فواتير فني معين
router.get('/invoices/filter/technician/:technicianId', technicianController.filterInvoicesByTechnician);

// تصفية الفواتير حسب التاريخ
router.get('/invoices/filter', technicianController.filterInvoices);

// تصفية الفواتير حسب الحالة
router.get('/invoices/filter/status', technicianController.filterInvoicesByStatus);

// جلب ملخص الفواتير
router.get('/invoices/summary', technicianController.getInvoicesSummary);

// تصدير الفواتير إلى PDF
router.get('/invoices/export/pdf', technicianController.exportInvoicesPDF);

// تصدير الفواتير إلى Excel
router.get('/invoices/export/excel', technicianController.exportInvoicesExcel);

// تصدير ملخص الفواتير إلى PDF
router.get('/invoices/summary/export/pdf', technicianController.exportInvoicesSummaryPDF);

// تصدير ملخص الفواتير إلى Excel
router.get('/invoices/summary/export/excel', technicianController.exportInvoicesSummaryExcel);

// إرسال إشعارات الفواتير المتأخرة
router.post('/invoices/notify/late', technicianController.sendLateInvoicesNotifications);

// جلب الإحصائيات العامة
router.get('/statistics', technicianController.getGeneralStatistics);

router.delete('/:technicianId/payments/:paymentId', technicianController.deletePayment);
router.put('/:technicianId/payments/:paymentId', technicianController.updatePayment);

module.exports = router;