const layout = 'backend/layouts/layout';

module.exports.index = async function (req, res, next) {
    res.render('backend/admin/dashboard/dashboard', { layout, pageTitle: 'Dashboard' });
}