export function validateCheckoutForm(form) {
    const fullName = form.fullName.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const address = form.address.value.trim();

    if (!fullName) {
        return "Please enter your full name.";
    }

    if (!email) {
        return "Please enter your email address.";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        return "Please enter a valid email address.";
    }

    if (!phone) {
        return "Please enter your phone number.";
    }

    if (!address) {
        return "Please enter your delivery address.";
    }

    return "";
}