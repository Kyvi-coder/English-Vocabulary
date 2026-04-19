package vocabularyMain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vocabularyMain.entity.UserProgress;

import java.util.List;
import java.util.Optional;

public interface user_progress_dao extends JpaRepository<UserProgress, Integer> {
    Optional<UserProgress> findByUserIdAndVocabularyId(int userId, int vocabularyId);

    List<UserProgress> findByUserIdOrderByVocabularyIdAsc(int userId);

    List<UserProgress> findByVocabularyIdOrderByUserIdAsc(int vocabularyId);

    List<UserProgress> findByLearnedOrderByLastReviewedAtDesc(boolean learned);
}
