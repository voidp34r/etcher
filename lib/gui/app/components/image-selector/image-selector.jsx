/*
 * Copyright 2016 resin.io
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict'

const React = require('react')
const ReactDOM = require('react-dom')
const propTypes = require('prop-types')

const middleEllipsis = require('./../../utils/middle-ellipsis')

const { Provider, Button, Modal, Txt } = require('rendition')

const shared = require('/./../../../../../lib/shared/units')
const { StepButton, StepNameButton, StepSelection,
  Footer, Underline, DetailsText, ChangeButton } = require('./../../styled-components')

class SelectImageButton extends React.Component {

  if (props.hasImage){
    return (
      <Provider>
          <StepNameButton
            plaintext
            onClick={props.showSelectedImageDetails}
            tooltip={props.imageBasename}
          >
            { middleEllipsis(props.imageName || props.imageBasename , 20) }
          </StepNameButton>
          <DetailsText>
            {shared.bytesToClosestUnit(props.imageSize)}
          </DetailsText>
          { !props.flashing &&
            <ChangeButton
              plaintext
              onClick={() => this.props.showSelectedImageDetails()}
              tooltip={this.props.imageBasename}
            >
              ( {middleEllipsis(this.props.imageName || this.props.imageBasename , 20)} )
              <Txt onClick={this.props.showSelectedImageDetails}> Show original modal </Txt>
            </StepNameButton>
            <SizeText>
              {shared.bytesToClosestUnit(this.props.imageSize)}
            </SizeText>
            { this.props.flashing ?
              null
              :
              <ChangeButton
                plaintext
                onClick={() => this.props.reselectImage()}
              >
                Change
              </ChangeButton>
            }
          </StepSelection>
        </Provider>
      )
    }
    else {
      return (
        <Provider>
          <StepSelection>
            <StepButton
              primary
              onClick={() => this.props.openImageSelector()}
            >
              Select image
            </StepButton>
            <Footer>
              { this.props.mainSupportedExtensions.join(', ') }, and
              <Underline
                tooltip={ this.props.extraSupportedExtensions.join(', ') }
              >
                {' '}others
              </Underline>
            </Footer>
          </StepSelection>
        </Provider>
      )
    }
  }
}

SelectImageButton.propTypes = {
  openImageSelector: propTypes.func,
  mainSupportedExtensions: propTypes.array,
  extraSupportedExtensions: propTypes.array,
  hasImage: propTypes.bool,
  showSelectedImageDetails: propTypes.func,
  imageName: propTypes.string,
  imageBasename: propTypes.string,
  reselectImage: propTypes.func,
  flashing: propTypes.bool,
  imageSize: propTypes.number,
}

module.exports = SelectImageButton
