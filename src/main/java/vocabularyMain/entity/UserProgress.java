package vocabularyMain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "user_progress",
        uniqueConstraints = @UniqueConstraint(name = "uq_user_progress_user_vocabulary", columnNames = {"user_id", "vocabulary_id"})
)
public class UserProgress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "user_id", nullable = false, insertable = false, updatable = false)
    private int userId;

    @Column(name = "vocabulary_id", nullable = false, insertable = false, updatable = false)
    private int vocabularyId;

    @Column(nullable = false)
    private boolean learned;

    @Column(name = "review_count", nullable = false)
    private int reviewCount;

    @Column(name = "last_reviewed_at")
    private LocalDateTime lastReviewedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vocabulary_id", nullable = false)
    private Vocabulary vocabulary;

    public UserProgress() {
    }

    public UserProgress(
            int id,
            int userId,
            int vocabularyId,
            boolean learned,
            int reviewCount,
            LocalDateTime lastReviewedAt
    ) {
        this.id = id;
        setUserId(userId);
        setVocabularyId(vocabularyId);
        this.learned = learned;
        this.reviewCount = reviewCount;
        this.lastReviewedAt = lastReviewedAt;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
        if (userId <= 0) {
            this.user = null;
            return;
        }

        User userReference = new User();
        userReference.setId(userId);
        this.user = userReference;
    }

    public int getVocabularyId() {
        return vocabularyId;
    }

    public void setVocabularyId(int vocabularyId) {
        this.vocabularyId = vocabularyId;
        if (vocabularyId <= 0) {
            this.vocabulary = null;
            return;
        }

        Vocabulary vocabularyReference = new Vocabulary();
        vocabularyReference.setId(vocabularyId);
        this.vocabulary = vocabularyReference;
    }

    public boolean isLearned() {
        return learned;
    }

    public void setLearned(boolean learned) {
        this.learned = learned;
    }

    public int getReviewCount() {
        return reviewCount;
    }

    public void setReviewCount(int reviewCount) {
        this.reviewCount = reviewCount;
    }

    public LocalDateTime getLastReviewedAt() {
        return lastReviewedAt;
    }

    public void setLastReviewedAt(LocalDateTime lastReviewedAt) {
        this.lastReviewedAt = lastReviewedAt;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
        this.userId = user == null ? 0 : user.getId();
    }

    public Vocabulary getVocabulary() {
        return vocabulary;
    }

    public void setVocabulary(Vocabulary vocabulary) {
        this.vocabulary = vocabulary;
        this.vocabularyId = vocabulary == null ? 0 : vocabulary.getId();
    }

    @Override
    public String toString() {
        return "UserProgress{" +
                "id=" + id +
                ", userId=" + userId +
                ", vocabularyId=" + vocabularyId +
                ", learned=" + learned +
                ", reviewCount=" + reviewCount +
                ", lastReviewedAt=" + lastReviewedAt +
                '}';
    }
}
