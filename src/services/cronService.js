import BookController from "../controllers/books.js";

class cronService {
  notifyBookStatus() {
    BookController.updateStatus();
  }
}
export default new cronService;
