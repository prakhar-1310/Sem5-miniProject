// // Controller for landing page
exports.getLandingPage = (req, res) => {
    res.render('landing', { title: "CampusConnect - Landing Page" });
};
