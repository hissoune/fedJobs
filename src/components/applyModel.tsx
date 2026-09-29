
import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

type ApplyModalProps = {
  visible: boolean;
  jobId: string;
  onClose: () => void;
  onSubmit: (message: string) => void;
};

export default function ApplyModal({
  visible,
  jobId,
  onClose,
  onSubmit,
}: ApplyModalProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (!message.trim()) return;

    onSubmit(message.trim());
    setMessage('');
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Apply for this job</Text>

          <Text style={styles.description}>
            Tell the customer why you are a good fit for this job.
          </Text>

          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Write your application..."
            placeholderTextColor="#94a3b8"
            multiline
            textAlignVertical="top"
            style={styles.input}
          />

          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onClose}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.submitButton,
                !message.trim() && styles.disabledButton,
              ]}
              onPress={handleSubmit}
              disabled={!message.trim()}
            >
              <Text style={styles.submitText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.45)',
  },

  modal: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 35,
  },

  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0f172a',
  },

  description: {
    marginTop: 8,
    marginBottom: 18,
    fontSize: 14,
    lineHeight: 21,
    color: '#64748b',
  },

  input: {
    minHeight: 140,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 14,
    padding: 15,
    fontSize: 15,
    color: '#0f172a',
  },

  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 18,
  },

  cancelButton: {
    flex: 1,
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f5f9',
  },

  cancelText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#334155',
  },

  submitButton: {
    flex: 1,
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111',
  },

  disabledButton: {
    opacity: 0.4,
  },

  submitText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
  },
});

