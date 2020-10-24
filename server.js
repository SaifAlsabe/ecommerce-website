express = require('express');
dotenv = require('dotenv');
mongoose = require('mongoose');
userRoute = require('./routes/userRoute');
productRoute = require('./routes/productRoute');
bodyParser = require('body-parser');
const path = require('path');

PORT = process.env.PORT || 5000;

dotenv.config();

const mongodbUrl = process.env.MONGODB_URI || process.env.MONGODB_URL;

mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
}).catch(error => console.log(error))

const app = express();

app.use(bodyParser.json());
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}



app.listen(PORT, () => {
    console.log('Server started at http://localhost:5000');
});