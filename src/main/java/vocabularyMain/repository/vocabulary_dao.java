package vocabularyMain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vocabularyMain.entity.Vocabulary;

import java.util.List;

public interface vocabulary_dao extends JpaRepository<Vocabulary, Integer> {
    List<Vocabulary> findByTopicIdOrderByWordAsc(int topicId);

    List<Vocabulary> findByWordContainingIgnoreCaseOrMeaningContainingIgnoreCaseOrExampleSentenceContainingIgnoreCaseOrPartOfSpeechContainingIgnoreCaseOrTopicNameContainingIgnoreCase(
            String word,
            String meaning,
            String exampleSentence,
            String partOfSpeech,
            String topicName
    );
}
