import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function Index() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good morning</Text>
          <Text style={styles.title}>Find your next job.</Text>
        </View>

        <Pressable style={styles.avatar}>
          <Text style={styles.avatarText}>K</Text>
        </Pressable>
      </View>

      {/* Search */}
      <View style={styles.search}>
        <Text style={styles.searchIcon}>⌕</Text>
        <TextInput
          placeholder="Search jobs, companies..."
          placeholderTextColor="#999"
          style={styles.searchInput}
        />
      </View>

      {/* Hero */}
      <View style={styles.hero}>
        <Text style={styles.heroLabel}>YOUR NEXT OPPORTUNITY</Text>

        <Text style={styles.heroTitle}>
          Discover jobs made for you.
        </Text>

        <Text style={styles.heroDescription}>
          Find opportunities that match your skills, experience and goals.
        </Text>

        <Pressable style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>
            Browse jobs
          </Text>
        </Pressable>
      </View>

      {/* Overview */}
      <Text style={styles.sectionTitle}>Your activity</Text>

      <View style={styles.stats}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Applications</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>4</Text>
          <Text style={styles.statLabel}>Interviews</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>7</Text>
          <Text style={styles.statLabel}>Saved</Text>
        </View>
      </View>

      {/* Quick actions */}
      <Text style={styles.sectionTitle}>Quick actions</Text>

      <View style={styles.actions}>
        <Pressable style={styles.actionCard}>
          <View style={styles.actionIcon}>
            <Text style={styles.iconText}>⌕</Text>
          </View>

          <View>
            <Text style={styles.actionTitle}>Find jobs</Text>
            <Text style={styles.actionDescription}>
              Explore new opportunities
            </Text>
          </View>
        </Pressable>

        <Pressable style={styles.actionCard}>
          <View style={styles.actionIcon}>
            <Text style={styles.iconText}>▣</Text>
          </View>

          <View>
            <Text style={styles.actionTitle}>My applications</Text>
            <Text style={styles.actionDescription}>
              Track your applications
            </Text>
          </View>
        </Pressable>

        <Pressable style={styles.actionCard}>
          <View style={styles.actionIcon}>
            <Text style={styles.iconText}>♡</Text>
          </View>

          <View>
            <Text style={styles.actionTitle}>Saved jobs</Text>
            <Text style={styles.actionDescription}>
              Jobs you've saved
            </Text>
          </View>
        </Pressable>
      </View>

      {/* Recommended jobs */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recommended for you</Text>

        <Pressable>
          <Text style={styles.viewAll}>View all</Text>
        </Pressable>
      </View>

      {/* Job 1 */}
      <Pressable style={styles.jobCard}>
        <View style={styles.jobTop}>
          <View style={styles.companyLogo}>
            <Text style={styles.companyLogoText}>T</Text>
          </View>

          <Pressable>
            <Text style={styles.saveIcon}>♡</Text>
          </Pressable>
        </View>

        <Text style={styles.jobTitle}>Frontend Developer</Text>

        <Text style={styles.company}>
          Tech Company · Casablanca
        </Text>

        <View style={styles.tags}>
          <Text style={styles.tag}>Full-time</Text>
          <Text style={styles.tag}>Remote</Text>
        </View>

        <Text style={styles.salary}>
          8,000 – 12,000 MAD
        </Text>
      </Pressable>

      {/* Job 2 */}
      <Pressable style={styles.jobCard}>
        <View style={styles.jobTop}>
          <View style={styles.companyLogo}>
            <Text style={styles.companyLogoText}>S</Text>
          </View>

          <Pressable>
            <Text style={styles.saveIcon}>♡</Text>
          </Pressable>
        </View>

        <Text style={styles.jobTitle}>Backend Developer</Text>

        <Text style={styles.company}>
          Startup · Rabat
        </Text>

        <View style={styles.tags}>
          <Text style={styles.tag}>Full-time</Text>
          <Text style={styles.tag}>Hybrid</Text>
        </View>

        <Text style={styles.salary}>
          10,000 – 15,000 MAD
        </Text>
      </Pressable>

      {/* Job 3 */}
      <Pressable style={styles.jobCard}>
        <View style={styles.jobTop}>
          <View style={styles.companyLogo}>
            <Text style={styles.companyLogoText}>D</Text>
          </View>

          <Pressable>
            <Text style={styles.saveIcon}>♡</Text>
          </Pressable>
        </View>

        <Text style={styles.jobTitle}>React Native Developer</Text>

        <Text style={styles.company}>
          Digital Agency · Casablanca
        </Text>

        <View style={styles.tags}>
          <Text style={styles.tag}>Full-time</Text>
          <Text style={styles.tag}>Remote</Text>
        </View>

        <Text style={styles.salary}>
          9,000 – 14,000 MAD
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f8',
  },

  content: {
    padding: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },

  greeting: {
    fontSize: 14,
    color: '#777',
    marginBottom: 4,
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111',
  },

  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },

  search: {
    height: 52,
    backgroundColor: '#fff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 20,
  },

  searchIcon: {
    fontSize: 25,
    color: '#555',
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#111',
  },

  hero: {
    backgroundColor: '#111',
    borderRadius: 22,
    padding: 24,
    marginBottom: 32,
  },

  heroLabel: {
    color: '#aaa',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 10,
  },

  heroTitle: {
    color: '#fff',
    fontSize: 27,
    fontWeight: '800',
    lineHeight: 33,
    marginBottom: 10,
  },

  heroDescription: {
    color: '#aaa',
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 22,
  },

  primaryButton: {
    backgroundColor: '#fff',
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  primaryButtonText: {
    color: '#111',
    fontSize: 15,
    fontWeight: '700',
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111',
    marginBottom: 14,
  },

  stats: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 32,
  },

  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#eee',
  },

  statNumber: {
    fontSize: 25,
    fontWeight: '800',
    color: '#111',
    marginBottom: 4,
  },

  statLabel: {
    fontSize: 12,
    color: '#777',
  },

  actions: {
    gap: 10,
    marginBottom: 32,
  },

  actionCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
  },

  actionIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },

  iconText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
  },

  actionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111',
    marginBottom: 3,
  },

  actionDescription: {
    fontSize: 12,
    color: '#888',
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  viewAll: {
    color: '#555',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 14,
  },

  jobCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },

  jobTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },

  companyLogo: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    justifyContent: 'center',
  },

  companyLogoText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111',
  },

  saveIcon: {
    fontSize: 26,
    color: '#555',
  },

  jobTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111',
    marginBottom: 5,
  },

  company: {
    fontSize: 13,
    color: '#777',
    marginBottom: 14,
  },

  tags: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },

  tag: {
    backgroundColor: '#f1f1f1',
    color: '#555',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    fontSize: 11,
    fontWeight: '600',
  },

  salary: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111',
  },
});