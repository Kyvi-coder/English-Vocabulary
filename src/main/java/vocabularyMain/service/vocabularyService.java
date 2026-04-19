package vocabularyMain.service;

import org.springframework.stereotype.Service;
import vocabularyMain.entity.Vocabulary;
import vocabularyMain.repository.vocabulary_dao;

import java.util.List;
import java.util.Optional;

@Service
public class vocabularyService {
    private final vocabulary_dao vocabularyDao;

    public vocabularyService(vocabulary_dao vocabularyDao) {
        this.vocabularyDao = vocabularyDao;
    }

    public List<Vocabulary> getAllVocabulary() {
        return vocabularyDao.findAll();
    }

    public Optional<Vocabulary> getVocabularyById(int id) {
        return vocabularyDao.findById(id);
    }

    public Vocabulary createVocabulary(Vocabulary vocabulary) {
        return vocabularyDao.save(vocabulary);
    }

    public Vocabulary updateVocabulary(int id, Vocabulary vocabulary) {
        Vocabulary existingVocabulary = vocabularyDao.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Vocabulary not found with id: " + id));

        existingVocabulary.setWord(vocabulary.getWord());
        existingVocabulary.setMeaning(vocabulary.getMeaning());
        existingVocabulary.setPronunciation(vocabulary.getPronunciation());
        existingVocabulary.setExampleSentence(vocabulary.getExampleSentence());
        existingVocabulary.setPartOfSpeech(vocabulary.getPartOfSpeech());
        existingVocabulary.setTopic(vocabulary.getTopic());
        return vocabularyDao.save(existingVocabulary);
    }

    public void deleteVocabulary(int id) {
        if (!vocabularyDao.existsById(id)) {
            throw new IllegalArgumentException("Vocabulary not found with id: " + id);
        }

        vocabularyDao.deleteById(id);
    }

    public List<Vocabulary> searchVocabulary(String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return getAllVocabulary();
        }

        String searchKeyword = keyword.trim();
        return vocabularyDao.findByWordContainingIgnoreCaseOrMeaningContainingIgnoreCaseOrExampleSentenceContainingIgnoreCaseOrPartOfSpeechContainingIgnoreCaseOrTopicNameContainingIgnoreCase(
                searchKeyword,
                searchKeyword,
                searchKeyword,
                searchKeyword,
                searchKeyword
        );
    }

    public List<Vocabulary> getVocabularyByTopicId(int topicId) {
        return vocabularyDao.findByTopicIdOrderByWordAsc(topicId);
    }
}
