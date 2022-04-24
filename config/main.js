module.exports = (port) => {
    const env = process.env;
    var baseURL = env.BASE_URL;
    const config = {
        pages: 10,
        isLive: env.live,
        tokenExpDays: '1D',
        EmployeeValidDays: '365',
        websiteName: env.WEBSITE_NAME,
        assetsImage: env.BASE_URL + 'public/assets/images/',
        backendAssetsJs: env.BASE_URL + 'public/assets/js/custom/backend/',
        adminAssetsJs: env.BASE_URL + 'public/assets/js/custom/backend/admin/',
        user_avatar: {
            base_path: './public/uploads/user/',
            path: baseURL + 'public/uploads/user/',
            default_path: baseURL + 'public/assets/images/blank-img.png'
        },
        user_certificates: {
            base_path: './public/uploads/user/certificates/',
            path: baseURL + 'public/uploads/user/certificates/',
            default_path: baseURL + 'public/assets/images/blank-img.png'
        },
        user_pan_card: {
            base_path: './public/uploads/user/pan_card/',
            path: baseURL + 'public/uploads/user/pan_card/',
            default_path: baseURL + 'public/assets/images/blank-img.png'
        },
        user_address_proof: {
            base_path: './public/uploads/user/address_proof/',
            path: baseURL + 'public/uploads/user/address_proof/',
            default_path: baseURL + 'public/assets/images/blank-img.png'
        },
        user_selfi: {
            base_path: './public/uploads/user/selfi/',
            path: baseURL + 'public/uploads/user/selfi/',
            default_path: baseURL + 'public/assets/images/blank-img.png'
        },
        tution_schedule_file: {
            base_path: './public/uploads/tution/schedule/',
            path: baseURL + 'public/uploads/tution/schedule/',
            default_path: baseURL + 'public/assets/images/blank-img.png'
        },
        post_doubt_image: {
            base_path: './public/uploads/post_doubt/',
            path: baseURL + 'public/uploads/post_doubt/',
            default_path: baseURL + 'public/assets/images/blank-img.png'
        },
        role_level: {
            SUP_ADMIN: 1,
        }
    };
    return config;
}