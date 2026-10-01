import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText } from "@/components/themed-text";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { getApplicationsAction } from "@/redux/slices/applicationsSlice";
import { ApplicationItem } from "@/components/ApplicationItem";
import { FlashList } from "@shopify/flash-list";
import { FilterApplicationStatus } from "@/components/filtePriority";
import ApplyModal from "@/components/applyModel";


type ApplicationStatus = "PENDING" | "APPROVED" | "DECLINED";

export default function Applications() {
  const insets = useSafeAreaInsets();
    const dispatch = useDispatch<AppDispatch>();
  const [filters,setFilters] = useState<{status: ApplicationStatus}| null >(null)
  const {applications,loading} = useSelector((state:RootState)=> state.applications)

  useEffect(()=>{
    dispatch(getApplicationsAction({ filters }))
  },[filters])
 

 

  const filter = (status: ApplicationStatus | null) => {
    setFilters(status === null ? null : { status })
  };

  // if(loading) return
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <View
        style={styles.container}
       
      >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>
            Applications
          </Text>

          <Text style={styles.subtitle}>
            Track your job applications
          </Text>
        </View>

        <View style={styles.countBadge}>
          <Text style={styles.countText}>
            {applications.length}
          </Text>
        </View>
      </View>

        <FilterApplicationStatus filter={filter} />
    
    <FlashList
      data={applications}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ApplicationItem application={item} />
      )}
      contentContainerStyle={styles.list}
    />
   
      </View>
    </SafeAreaView>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8fafc",
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