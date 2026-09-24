import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText } from "@/components/themed-text";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

const applications = [
  {
    id: "1",
    job: "AC Installation & Maintenance",
    location: "Safi",
    status: "PENDING",
    date: "Today",
  },
  {
    id: "2",
    job: "Electrical System Repair",
    location: "Safi",
    status: "APPROVED",
    date: "Sep 20",
  },
  {
    id: "3",
    job: "Solar Panel Maintenance",
    location: "Safi",
    status: "DECLINED",
    date: "Sep 18",
  },
];

type ApplicationStatus = "PENDING" | "APPROVED" | "DECLINED";

export default function Applications() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.content,
        {
          paddingTop: insets.top + 18,
          paddingBottom: insets.bottom + 100,
        },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <ThemedText style={styles.title}>
            Applications
          </ThemedText>

          <ThemedText style={styles.subtitle}>
            Track your job applications
          </ThemedText>
        </View>

        <View style={styles.countBadge}>
          <ThemedText style={styles.countText}>
            {applications.length}
          </ThemedText>
        </View>
      </View>

      {/* Filters */}
      <View style={styles.filters}>
        <Pressable style={[styles.filter, styles.activeFilter]}>
          <ThemedText style={styles.activeFilterText}>
            All
          </ThemedText>
        </Pressable>

        <Pressable style={styles.filter}>
          <ThemedText style={styles.filterText}>
            Pending
          </ThemedText>
        </Pressable>

        <Pressable style={styles.filter}>
          <ThemedText style={styles.filterText}>
            Approved
          </ThemedText>
        </Pressable>
      </View>

      {/* Applications */}
      <View style={styles.list}>
        {applications.map((application) => (
          <ApplicationItem
            key={application.id}
            job={application.job}
            location={application.location}
            status={application.status as ApplicationStatus}
            date={application.date}
          />
        ))}
      </View>
    </ScrollView>
  );
}

function ApplicationItem({
  job,
  location,
  status,
  date,
}: {
  job: string;
  location: string;
  status: ApplicationStatus;
  date: string;
}) {
  const statusStyle = getStatusStyle(status);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.application,
        pressed && styles.applicationPressed,
      ]}
    >
      {/* Application header */}
      <View style={styles.applicationHeader}>
        <View style={styles.jobSection}>
          <View style={styles.jobIcon}>
            <ThemedText style={styles.jobIconText}>
              F
            </ThemedText>
          </View>

          <View style={styles.jobInfo}>
            <ThemedText
              style={styles.jobTitle}
              numberOfLines={1}
            >
              {job}
            </ThemedText>

            <ThemedText style={styles.location}>
              {location}
            </ThemedText>
          </View>
        </View>

        <View
          style={[
            styles.statusBadge,
            statusStyle.background,
          ]}
        >
          <View
            style={[
              styles.statusDot,
              statusStyle.dot,
            ]}
          />

          <ThemedText style={styles.statusText}>
            {status}
          </ThemedText>
        </View>
      </View>

      {/* Application metadata */}
      <View style={styles.applicationFooter}>
        <View>
          <ThemedText style={styles.metaLabel}>
            Applied
          </ThemedText>

          <ThemedText style={styles.metaValue}>
            {date}
          </ThemedText>
        </View>

        <View style={styles.viewApplication}>
          <ThemedText style={styles.viewText}>
            View application
          </ThemedText>

          <ThemedText style={styles.arrow}>
            →
          </ThemedText>
        </View>
      </View>
    </Pressable>
  );
}

function getStatusStyle(status: ApplicationStatus) {
  switch (status) {
    case "APPROVED":
      return {
        background: styles.approvedBackground,
        dot: styles.approvedDot,
      };

    case "DECLINED":
      return {
        background: styles.declinedBackground,
        dot: styles.declinedDot,
      };

    default:
      return {
        background: styles.pendingBackground,
        dot: styles.pendingDot,
      };
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 20,
  },

  // Header

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 26,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    letterSpacing: -0.7,
  },

  subtitle: {
    marginTop: 5,
    fontSize: 14,
    color: "#64748b",
  },

  countBadge: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#2563eb",
    alignItems: "center",
    justifyContent: "center",
  },

  countText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "800",
  },

  // Filters

  filters: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 22,
  },

  filter: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: "#f1f5f9",
  },

  activeFilter: {
    backgroundColor: "#2563eb",
  },

  filterText: {
    color: "#64748b",
    fontSize: 13,
    fontWeight: "600",
  },

  activeFilterText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
  },

  // List

  list: {
    gap: 12,
  },

  application: {
    padding: 18,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },

  applicationPressed: {
    opacity: 0.65,
  },

  // Application header

  applicationHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },

  jobSection: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },

  jobIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: "#eff6ff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  jobIconText: {
    color: "#2563eb",
    fontSize: 17,
    fontWeight: "800",
  },

  jobInfo: {
    flex: 1,
  },

  jobTitle: {
    fontSize: 16,
    fontWeight: "700",
  },

  location: {
    marginTop: 4,
    fontSize: 13,
    color: "#64748b",
  },

  // Status

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 10,
  },

  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },

  statusText: {
    fontSize: 10,
    fontWeight: "800",
  },

  pendingBackground: {
    backgroundColor: "#fff7ed",
  },

  pendingDot: {
    backgroundColor: "#f97316",
  },

  approvedBackground: {
    backgroundColor: "#f0fdf4",
  },

  approvedDot: {
    backgroundColor: "#22c55e",
  },

  declinedBackground: {
    backgroundColor: "#fef2f2",
  },

  declinedDot: {
    backgroundColor: "#ef4444",
  },

  // Footer

  applicationFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 18,
    paddingTop: 14,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#e2e8f0",
  },

  metaLabel: {
    fontSize: 11,
    color: "#94a3b8",
    marginBottom: 3,
  },

  metaValue: {
    fontSize: 13,
    fontWeight: "700",
  },

  viewApplication: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  viewText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#2563eb",
  },

  arrow: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2563eb",
  },
});