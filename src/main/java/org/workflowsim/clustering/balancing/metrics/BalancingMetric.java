/*
 * 
 *  Copyright 2012-2013 University Of Southern California
 * 
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 * 
 *   http://www.apache.org/licenses/LICENSE-2.0
 * 
 *   Unless required by applicable law or agreed to in writing,
 *   software distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 * 
 */
package org.workflowsim.clustering.balancing.metrics;

import org.workflowsim.clustering.TaskSet;

import java.util.List;

/**
 * Every balancing metric should implement this interface
 * @author Weiwei Chen
 * @since WorkflowSim Toolkit 1.0
 * @date Apr 9, 2013
 */
public interface BalancingMetric {
    /** Gets the metric value.
     * @param list
     * @return  */
    public double getMetric(List<TaskSet> list);
}
