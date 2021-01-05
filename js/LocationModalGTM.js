function pushCloseGTM() {
    if (jQuery.inArray(location.hostname,
        [
            "qa.fticonsulting.com", "qa.fticonsulting-asia.com", "qa.fticonsulting-emea.com",
            "qa.fticonsulting-latam.com"
        ]) ==
        -1) {

        dataLayer.push({ 'event': 'Location_notice_X' });
    }
}

function pushOkGTM() {
    if (jQuery.inArray(location.hostname,
        [
            "qa.fticonsulting.com", "qa.fticonsulting-asia.com", "qa.fticonsulting-emea.com",
            "qa.fticonsulting-latam.com"
        ]) ==
        -1) {

        dataLayer.push({ 'event': 'Location_notice_OK' });
    }
}