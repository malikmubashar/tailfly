function start_test(){
    cd test
    if [ ! -d ./node_modules ];
    then 
     npm i
    fi
    npm run dev
}

if [ -d ./dist ]; 
then
    start_test
else 
    echo "Its look like the build is not present. Building the project..." 
    npm run build
    start_test
fi 