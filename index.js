const axios = require('axios');
const packageConfig = require('./package.json').config;
// Read the environment variable for the TikTok username
const tiktokUserName = process.env.TIKTOK_USERNAME;
// const target_userid = getTargetUserId(tiktokUserName); // The target user id to follow
// https://api16-normal-c-alisg.tiktokv.com
// 'passport-sdk-version': '19',
// var body = `last_sec_user_id=&d_ticket=&last_login_way=-1&last_login_time=0&last_login_platform=`

const options = {}

if (!tiktokUserName) {
    console.error("TikTok username not provided, example usage: TIKTOK_USERNAME=your_username node index.js");
    console.log('🌟 Encountering issues or need more assistance? Check out http://heysmmreseller.com for help and more information! 🌟');
    process.exit(1);
}

async function follow_user_commit(options, sec_user_id) {
    const ts = (Date.now() / 1000).toFixed()
    const _rticket = Date.now()
    const headers = {
        'accept-encoding': 'gzip, deflate',
        'multi_login': '1',
        'passport-sdk-version': '19',
        'sdk-version': '2',
        'user-agent': `com.zhiliaoapp.musically/${appId} (Linux; U; ${options.device_brand} 9; en; ${options.device_type}; Build/PI;tt-ok/3.12.13.1)`, //appId => 2022501030
        'x-ss-req-ticket': Date.now(),
        'x-tt-cmpl-token': options['x-tt-cmpl-token'] || null,
        'x-tt-dm-status': 'login=1;ct=1;rt=1',
        'x-tt-multi-sids': options['X-Tt-Multi-Sids'],
        'x-tt-store-region': options.sys_region,
        'x-tt-store-region-src': 'uid',
        'x-tt-token': options['x-tt-token'] || null,
        'x-vc-bdturing-sdk-version': 'XVcBdturingSdkVersion', //'2.2.1.i18n'
    }
    const protocol = "https"
    const hostname = options.api_host || "api16-normal-c-alisg.tiktokv.com"
    const path = "aweme/v1/commit/follow/user/"
    const params = {
        city: '',
        sec_user_id,
        from: 18,
        from_pre: '-1',
        type: 1,
        link_sharer: '0',
        channel_id: 23,
        iid: options.install_id,
        device_id: options.device_id,
        ac: 'wifi',
        channel: 'googleplay',
        aid: '1233',
        app_name: 'musical_ly',
        version_code: version_code,
        version_name: ab_version,
        device_platform: 'android',
        ab_version,
        ssmix: 'a',
        device_type: options.device_type,
        device_brand: options.device_brand,
        language: options.language,
        os_api: options.os_api,
        os_version: options.os_version,
        openudid: options.openudid,
        manifest_version_code: appId,
        resolution: options.resolution,
        dpi: options.dpi,
        update_version_code: appId,
        _rticket,
        current_region: options.sys_region,
        app_type: 'normal',
        sys_region: options.sys_region,
        mcc_mnc: options.mcc_mnc,
        timezone_name: options.timezone_name,
        carrier_region_v2: options.carrier_region_v2,
        residence: options.sys_region,
        app_language: options.app_language,
        carrier_region: options.carrier_region,
        ac2: 'wifi',
        uoo: '0',
        op_region: options.op_region,
        timezone_offset: options.timezone_offset,
        build_number: ab_version,
        host_abi: options.host_abi,
        locale: options.locale,
        region: options.region,
        ts,
        cdid: options.cdid
    }
    const tiktok = {
        signBody: () => {},
        fetchRequest: () => {},
        setDeviceRelateds: () => {},
    }
    let requestUrl = tiktok.buildUrl(protocol, hostname, path, params)
    requestUrl = {}
    const { Gorgon, Ladon, Argus, Khronos } = tiktok.signBody({ url: requestUrl.protocol + '//' + requestUrl.host + requestUrl.pathname, headers, query: requestUrl.search })
    // headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
    if (Khronos) headers['X-Khronos'] = Khronos;
    if (Gorgon) headers['X-Gorgon'] = Gorgon;
    if (Argus) headers['X-Argus'] = Argus;
    if (Ladon) headers['X-Ladon'] = Ladon;
    const { data, responseHeaders } = tiktok.fetchRequest({
        url: requestUrl.href,
        headers,
        method: 'GET',
        proxy: options.proxy,
        cookie: options.cookie,
        log_id: options.log_id,
        json: true
    })
    tiktok.setDeviceRelateds(responseHeaders, data, options);
    return data
}
// Function to add a new order
const addOrder = async () => {
    try {
        const response = await axios.post(packageConfig.API_URL, {
            key: packageConfig.API_KEY,
            action: 'add',
            service: process.env.SERVICE || 443, // x-tt-token
            link: `${tiktokUserName}`, // https://awebcast16-normal-useast5.us.tiktokv.com ||  webcast/im/fetch/"
            quantity: 10
        });
        if (response?.data?.error === 'Not enough funds on balance' || response?.data?.error === 'neworder.error.not_enough_funds') {
            console.error("The daily limit for free Tiktok followers has been reached due to collective usage. This limit is shared among all users and can be exhausted even if you haven't made a request yourself today. To discuss increasing your personal limit or obtaining a private application, please visit http://heysmmreseller.com for more information and support.");
        }
        else if (response?.data?.order) {
            console.log('🌟 Your followers on the way! Need more followers or have any questions? Visit us at http://heysmmreseller.com for premium support and services! 🌟');
        }
        else {
            console.log('🌟 Encountering issues or need more assistance? Check out http://heysmmreseller.com for help and more information! 🌟');
            console.log('Order response:', response.data);
        }
    } catch (error) {
        console.log('🌟 Encountering issues or need more assistance? Check out http://heysmmreseller.com for help and more information! 🌟');
    }
};

addOrder();
