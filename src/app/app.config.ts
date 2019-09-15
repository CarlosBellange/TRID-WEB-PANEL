export const AppUrlsConst: any = {
    /** Live URL ALL */
    
     //API_URL: 'http://tridab.se:5001',
     
    API_URL: 'http://localhost:5002',
    // API_URL: "http://192.168.1.17:5002",
    IMG_URL:'http://localhost:5002',
}
if(window.location.hostname == 'localhost'){
    AppUrlsConst.API_URL = 'http://192.168.0.16:5002';
    AppUrlsConst.IMG_URL='http://192.168.0.16:5002';
}else{
    AppUrlsConst.API_URL = 'http://tridab.se:5001';
    AppUrlsConst.IMG_URL='http://tridab.se:5001';
}
