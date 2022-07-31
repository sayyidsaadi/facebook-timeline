// Get Elementemts

let post_add_form =document.getElementById('post_add_form');
let alertBox = document.getElementById('alertBox');
let setAllPost = document.getElementById('setAllPost');
let post_edit_form = document.getElementById('post_edit_form');


// Post add Form Submit 
post_add_form.onsubmit =(e)=>{
    e.preventDefault();

    // Get Form Val 
    let post_frm_data = new FormData(e.target);
    let data = Object.fromEntries(post_frm_data.entries());
    let {uname, uimage, pcontent, pimage} = Object.fromEntries(post_frm_data.entries());
    
    let uniqueId = Math.floor(Math.random()*10000)+'_'+Date.now();
    // Validation 
    if(!uname || !uimage || !pcontent || !pimage){

        alertBox.innerHTML = alertFuntion('All Fileds are Required');

    }else{

        setLsData('fb_post', {...data, id:uniqueId})
        alertBox.innerHTML = alertFuntion('Post Create Success', 'success');
        post_add_form.reset();
        showData()

    }
}


// Show  Data
const showData = ()=>{

    let receiveLsData = getLsData('fb_post');
    let postList='';
    // check and Update data 
    if(!receiveLsData || receiveLsData ==0){
        postList = `
        <div class="card mx-4">
            <div class="card-body text-center">
                <p class="mb-0">No Post Found</p>
            </div>
        </div>
        
        `
    }

    if(receiveLsData){

        receiveLsData.map((item, index)=>{
            postList +=`
            <div class="card mx-4 mt-4">
                <div class="card-body">

                    <div class="post-info-top">

                        <div class="post-info-top-left">

                            <div class="user-profile-info">
                                <a href=""><img src="${item.uimage}" alt=""></a>
                            </div>
                            <div class="user-profile-title">
                                <h6>${item.uname}</h6>
                                <span>2h .</span>
                                <i class="fa-solid fa-earth-americas"></i>
                            </div>
                        </div>

                        <div class="post-info-top-right">
                            <div class="dropdown">
                                <a class="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="fa-solid fa-ellipsis"></i>
                                </a>
                              
                                <ul class="dropdown-menu">
                                  <li><a class="dropdown-item edit_post" href="#post_edit_Modal" data-bs-toggle="modal" post_index="${index}">Edit</a></li>
                                  <li><a class="dropdown-item delete_post" post_index="${index}" href="#"> Delet</a></li>
                                </ul>
                              </div>
                        </div>
                    </div>
                    <p class="mb-0">${item.pcontent}</p>
                </div>
                <img class="w-100" src="${item.pimage}" alt="">
            </div>
        `
        })

    }
    
setAllPost.innerHTML = postList;
}
showData()


// Post  Edit 
setAllPost.onclick = (e)=>{

    e.preventDefault();

    // Get Post index 
    if(e.target.classList.contains('edit_post')){


        let index = e.target.getAttribute('post_index')
        let data = getLsData('fb_post');
        let {uname, uimage, pcontent, pimage} = data[index];

        post_edit_form.innerHTML =`
                <div class="my-3">
                <label for="">User Name</label>
                <input type="text" value="${uname}" name="uname" class="form-control">
            </div>
            <div class="my-3">
                <label for="">User Photo</label>
                <input type="text" value="${uimage}" name="uimage" class="form-control">
            </div>
            <div class="my-3">
                <input type="text" value="${index}" name="index" class="form-control">
            </div>
            <div class="my-3">
                <label for="">Post Content</label>
                <textarea name="pcontent" id="" class="form-control">${pcontent}</textarea>
            </div>
            <div class="my-3">
                <label for="">Post Image</label>
                <input type="text" name="pimage" value="${pimage}" class="form-control">
            </div>
            <button class="btn btn-primary w-100">Update Post</button>
        
        `
        

    }

     // Get Index Fo Delet 
     if(e.target.classList.contains('delete_post')){

        let userPer = confirm('Do You Want to Delete Your Post..?')
        if(userPer){
            let index = e.target.getAttribute('post_index');
            let dataDelete = getLsData('fb_post');
            dataDelete.splice(index, 1);
            updateLsData('fb_post', dataDelete)
            showData()
        }else{
            alert('Your post Safe')
        }

        
        

    }
    
}

// Update Data 
post_edit_form.onsubmit = (e)=>{

    e.preventDefault()

    // Get Form Value 
    let frn_val = new FormData(e.target);
    let {uname, uimage, pcontent, pimage, index} = Object.fromEntries(frn_val.entries());
    let data = getLsData('fb_post');
    data[index] = {uname, uimage, pcontent, pimage};
    
    updateLsData('fb_post', data);
    showData()



}

