import PropTypes from 'prop-types';
import React from 'react';
import Alert from 'Components/Alert';
import Form from 'Components/Form/Form';
import FormGroup from 'Components/Form/FormGroup';
import FormInputGroup from 'Components/Form/FormInputGroup';
import FormLabel from 'Components/Form/FormLabel';
import Button from 'Components/Link/Button';
import SpinnerErrorButton from 'Components/Link/SpinnerErrorButton';
import LoadingIndicator from 'Components/Loading/LoadingIndicator';
import ModalBody from 'Components/Modal/ModalBody';
import ModalContent from 'Components/Modal/ModalContent';
import ModalFooter from 'Components/Modal/ModalFooter';
import ModalHeader from 'Components/Modal/ModalHeader';
import { inputTypes, kinds } from 'Helpers/Props';
import { boolSettingShape, numberSettingShape, tagSettingShape } from 'Helpers/Props/Shapes/settingShape';
import translate from 'Utilities/String/translate';
import styles from './EditDelayProfileModalContent.css';

function EditDelayProfileModalContent(props) {
  const {
    id,
    isFetching,
    error,
    isSaving,
    saveError,
    item,
    protocol,
    protocolOptions,
    onInputChange,
    onProtocolChange,
    onSavePress,
    onModalClose,
    onDeleteDelayProfilePress,
    ...otherProps
  } = props;

  const {
    enableUsenet,
    enableTorrent,
    usenetDelay,
    torrentDelay,
    tags
  } = item;

  return (
    <ModalContent onModalClose={onModalClose}>
      <ModalHeader>
        {id ? 'Edit Delay Profile' : 'Add Delay Profile'}
      </ModalHeader>

      <ModalBody>
        {
          isFetching &&
            <LoadingIndicator />
        }

        {
          !isFetching && !!error &&
            <div>
              {translate('UnableToAddANewQualityProfilePleaseTryAgain')}
            </div>
        }

        {
          !isFetching && !error &&
            <Form {...otherProps}>
              <FormGroup>
                <FormLabel>
                  {translate('Protocol')}
                </FormLabel>

                <FormInputGroup
                  type={inputTypes.SELECT}
                  name="protocol"
                  value={protocol}
                  values={protocolOptions}
                  helpText={translate('ProtocolHelpText')}
                  onChange={onProtocolChange}
                />
              </FormGroup>

              {
                enableUsenet.value &&
                  <FormGroup>
                    <FormLabel>
                      {translate('UsenetDelay')}
                    </FormLabel>

                    <FormInputGroup
                      type={inputTypes.NUMBER}
                      name="usenetDelay"
                      unit="minutes"
                      {...usenetDelay}
                      helpText={translate('UsenetDelayHelpText')}
                      onChange={onInputChange}
                    />
                  </FormGroup>
              }

              {
                enableTorrent.value &&
                  <FormGroup>
                    <FormLabel>
                      {translate('TorrentDelay')}
                    </FormLabel>

                    <FormInputGroup
                      type={inputTypes.NUMBER}
                      name="torrentDelay"
                      unit="minutes"
                      {...torrentDelay}
                      helpText={translate('TorrentDelayHelpText')}
                      onChange={onInputChange}
                    />
                  </FormGroup>
              }

              {
                id === 1 ?
                  <Alert>
                    This is the default profile. It applies to all artist that don't have an explicit profile.
                  </Alert> :

                  <FormGroup>
                    <FormLabel>
                      {translate('Tags')}
                    </FormLabel>

                    <FormInputGroup
                      type={inputTypes.TAG}
                      name="tags"
                      {...tags}
                      helpText={translate('TagsHelpText')}
                      onChange={onInputChange}
                    />
                  </FormGroup>
              }
            </Form>
        }
      </ModalBody>
      <ModalFooter>
        {
          id && id > 1 &&
            <Button
              className={styles.deleteButton}
              kind={kinds.DANGER}
              onPress={onDeleteDelayProfilePress}
            >
              Delete
            </Button>
        }

        <Button
          onPress={onModalClose}
        >
          Cancel
        </Button>

        <SpinnerErrorButton
          isSpinning={isSaving}
          error={saveError}
          onPress={onSavePress}
        >
          Save
        </SpinnerErrorButton>
      </ModalFooter>
    </ModalContent>
  );
}

const delayProfileShape = {
  enableUsenet: PropTypes.shape(boolSettingShape).isRequired,
  enableTorrent: PropTypes.shape(boolSettingShape).isRequired,
  usenetDelay: PropTypes.shape(numberSettingShape).isRequired,
  torrentDelay: PropTypes.shape(numberSettingShape).isRequired,
  order: PropTypes.shape(numberSettingShape),
  tags: PropTypes.shape(tagSettingShape).isRequired
};

EditDelayProfileModalContent.propTypes = {
  id: PropTypes.number,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.object,
  isSaving: PropTypes.bool.isRequired,
  saveError: PropTypes.object,
  item: PropTypes.shape(delayProfileShape).isRequired,
  protocol: PropTypes.string.isRequired,
  protocolOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  onInputChange: PropTypes.func.isRequired,
  onProtocolChange: PropTypes.func.isRequired,
  onSavePress: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired,
  onDeleteDelayProfilePress: PropTypes.func
};

export default EditDelayProfileModalContent;
