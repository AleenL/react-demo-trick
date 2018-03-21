import React from 'react';

const SecondsBottom = ({seconds}) =>
    <div className="bottom">
        {seconds>5 ? '大':'小'}于5的seconds{seconds}
    </div>
;

export default SecondsBottom;