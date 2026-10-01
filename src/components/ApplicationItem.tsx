import { ApplicationStatus } from "@/types";
import { View, Text, StyleSheet, Pressable } from "react-native";
import ApplyModal from "./applyModel";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { updateMessageAction } from "@/redux/slices/applicationsSlice";
import { showErrorMessage, showSuccessMessage } from "./flashMessages";

export const ApplicationItem = ({ application }: { application: any }) => {
    const [applyVisible, setApplyVisible] = useState(false);
    const statusStyle = getStatusStyle(application.status); 
    const {error, loading} = useSelector((state:RootState)=> state.applications)
      const dispatch = useDispatch<AppDispatch>();

    const handleUpadate = (message:string) => {

        try{
            console.log("Update message:", message);
            dispatch(updateMessageAction({ id: application.id, message }));
            showSuccessMessage('Operation completed successfully!')
            
          
        }catch(err){
            console.log(err)
            showErrorMessage(error)
        }finally{
              setApplyVisible(false);
        }
  }

  return (
    <View style={styles.card}>
      {/* Technician */}
      <View style={styles.header}>
        <View style={styles.technicianInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {application.technician.name.charAt(0).toUpperCase()}
            </Text>
          </View>

          <View>
            <Text style={styles.technicianName}>
              {application.technician.name}
            </Text>

            <Text style={styles.appliedText}>
              Applied for {application.job.title}
            </Text>
          </View>
        </View>

      <View style={[styles.statusBadge, statusStyle.background]}>
        <View style={[styles.statusDot, statusStyle.dot]} />
        <Text style={[styles.statusText, { color: statusStyle.color }]}>
            {application.status}
        </Text>
        </View>
      </View>

      {loading ? (
        <Text style={{ color: "blue", fontSize: 12, marginTop: 10 }}>
          Updating message...
        </Text>
      ) : (
        <Pressable style={styles.pitchContainer} onPress={() => setApplyVisible(true)}>
          <Text style={styles.pitchLabel}>Message</Text>

          <Text style={styles.message}>{application.message}</Text>
        </Pressable>
      )}
      
       

      {/* Job information */}
      <View style={styles.jobInfo}>
        <View>
          <Text style={styles.infoLabel}>Job price</Text>
          <Text style={styles.price}>
            {application.job.price} DH
          </Text>
        </View>

        <View>
          <Text style={styles.infoLabel}>Priority</Text>
          <Text style={styles.priority}>
            {application.job.priority}
          </Text>
        </View>

        <View>
          <Text style={styles.infoLabel}>Applied</Text>
          <Text style={styles.date}>
            {new Date(application.createdAt).toLocaleDateString()}
          </Text>
        </View>
      </View>
       <ApplyModal
              visible={applyVisible}
              onClose={() => setApplyVisible(false)}
              message={application.message}
              onSubmit={(message)=>handleUpadate(message)}
              
      />
    </View>
  );
};



function getStatusStyle(status: ApplicationStatus) {
  switch (status) {
    case "APPROVED":
      return {
        background: styles.approvedBackground,
        dot: styles.approvedDot,
        color: "#1B5E20",
      };

    case "DECLINED":
      return {
        background: styles.declinedBackground,
        dot: styles.declinedDot,
        color: "#ef4444",
      };

    default:
      return {
        background: styles.pendingBackground,
        dot: styles.pendingDot,
        color: "#f97316",
      };
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,

    elevation: 3,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  technicianInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  avatarText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#4F46E5",
  },

  technicianName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 3,
  },

  appliedText: {
    fontSize: 12,
    color: "#6B7280",
    maxWidth: 190,
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#FFF7ED",
  },

  statusText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#EA580C",
  },

  pitchContainer: {
    marginTop: 18,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },

  pitchLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#9CA3AF",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  message: {
    fontSize: 14,
    lineHeight: 21,
    color: "#374151",
  },

  jobInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },

  infoLabel: {
    fontSize: 11,
    color: "#9CA3AF",
    marginBottom: 4,
  },

  price: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
  },

  priority: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },

  date: {
    fontSize: 13,
    color: "#6B7280",
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
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
});