//Поясніть своїми словами, що таке AJAX і чим він корисний при розробці Javascript
//Це технологія, що може обновляти части сторінки, а не всю її. Також, вона відправляє запити на сервер и отримує відповіді асинхронно. Завдяки їй, користувач може взаємодіяти зі сторінкою не перезавантажуючи її повністю.



const URL = 'https://ajax.test-danit.com/api/swapi/films';

class Films {
    constructor(url) {
        this.url = url;
        
    }
    getFilms() {
        return new Promise((resolve, reject) => {
           try {
            const xhr = new XMLHttpRequest;
            xhr.open('GET', this.url);
            xhr.send(null);
            xhr.onload = () => {
                resolve(JSON.parse(xhr.response));
            }
            xhr.onerror = () => {
                reject('error');
            }
           }catch(e) {
            reject('error');
           }
        })
    }
    render(filmList) {
          
        const list = document.createElement('ul');
        const listArray = filmList.map(({name, episodeId, openingCrawl, characters}) => {
            characters.forEach(el => {
                    // const wrapper = document.querySelector('wrapper');
                    // wrapper.style.display = 'block';
                new Promise((resolve, reject) => {
                    try {
                        const xhr = new XMLHttpRequest;
                        xhr.open('GET', el);
                        xhr.send(null);
                        xhr.onload = () => {
                            resolve(JSON.parse(xhr.response));
                        }

                        // xhr.onloadend = function() {
                        //     // Удалить элемент с загрузчиком после получения ответа
                        //     wrapper.style.display = 'none';

                        // };

                        xhr.onerror = () => {
                            reject('error');
                        }
                       }catch(e) {
                        reject('error');
                        
                       }
                }).then(resolve => {
                    const charlist = document.createElement('ul');
                    filmElem.append(charlist);
                    const charElem = document.createElement('li');
                    charElem.textContent = resolve.name;
                    console.log(resolve.name);
                    charlist.append(charElem);
                })

            });
            let filmElem = document.createElement('li');
            filmElem.textContent = `${name} - ${episodeId} : " ${openingCrawl} "`; 
            return filmElem;
        })
        list.append(...listArray);
        return list;
    }
}

const films = new Films(URL);
films
.getFilms()
.then((response) => {
    document.body.append((films.render(response)));
    console.log(response);
})
.catch((err) => {
    console.log(err);
})